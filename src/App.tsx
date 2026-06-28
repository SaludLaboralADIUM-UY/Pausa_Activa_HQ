import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Wind,
  ArrowLeftRight,
  Monitor,
  ChevronRight,
  ChevronLeft,
  Activity,
  Award,
  Eye,
  Droplets,
  CheckCircle2,
  RefreshCw,
  Moon,
  Sun
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { activeBreakRoutines, Hotspot, TransitionStep, Routine } from "./data";

const getStepSideStatus = (routId: string, stepIdx: number, mirrored: boolean): string => {
  if (routId === 'cervical') {
    if (stepIdx === 0) return 'estándar';
    if (stepIdx === 1) return 'izquierdo';
    if (stepIdx === 2) return 'derecho';
  }
  if (routId === 'rotacion') {
    if (stepIdx === 0) return 'estándar';
    if (stepIdx === 1 || stepIdx === 3 || stepIdx === 5) return 'izquierdo';
    if (stepIdx === 2 || stepIdx === 4 || stepIdx === 6) return 'derecho';
  }
  if (routId === 'toracica') return 'estándar';
  if (routId === 'respiracion') return 'estándar';
  if (routId === 'triceps' || routId === 'elongacion_triceps') {
    if (stepIdx === 0) return 'estándar';
    if (stepIdx === 1) return 'derecho';
    if (stepIdx === 2) return 'izquierdo';
  }
  if (routId === 'muneca_codo') {
    if (stepIdx === 0) return 'estándar';
    if (stepIdx === 1 || stepIdx === 3) return 'derecho';
    if (stepIdx === 2 || stepIdx === 4) return 'izquierdo';
  }
  if (routId === 'rotacion_tronco') {
    if (stepIdx === 0) return 'estándar';
    if (stepIdx === 1) return 'derecho';
    if (stepIdx === 2) return 'izquierdo';
  }
  if (routId === 'piriforme') {
    if (stepIdx === 0) return 'estándar';
    if (stepIdx === 1) return 'derecho';
    if (stepIdx === 2) return 'izquierdo';
  }
  if (routId === 'bajando_tierra') return 'estándar';

  return mirrored ? 'izquierdo' : 'derecho';
};

const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '');

const AREAS_TRABAJO = [
  'Administrativo Depósito',
  'Administrativo Gerencia',
  'Administrativo Producción',
  'Asuntos Regulatorios',
  'Calidad - Gestión documental',
  'Calidad - Licencias',
  'Calidad - Operativa',
  'Calidad - QA',
  'Calidad - QC',
  'Costos',
  'Gerencia',
  'Ingeniería / EHS',
  'RRHH',
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [selectedArea, setSelectedArea] = useState<string | null>(
    () => localStorage.getItem('adium_area') ?? null
  );
  const [areaDropdownOpen, setAreaDropdownOpen] = useState<boolean>(false);
  const areaDropdownRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // Start paused — user must press Reanudar Ciclo
  const [routineIndex, setRoutineIndex] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [prevStep, setPrevStep] = useState<number>(0);
  const [phase, setPhase] = useState<'hold' | 'transition'>('hold');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => {
    const routine = activeBreakRoutines[0];
    const step = routine.steps[0];
    const num = parseInt(step.duration);
    const base = isNaN(num) ? 15 : num;
    return routine.id === 'respiracion' ? base + 1 : base;
  });
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [isMirrored, setIsMirrored] = useState<boolean>(false);

  // Dual screen mode: 'body' = pausas activas (cuerpo), 'eyes' = fatiga visual 20/20/20
  const [screenMode, setScreenMode] = useState<'body' | 'eyes'>('body');
  // Marks the full body circuit as finished → shows the hydration closing screen
  const [sequenceFinished, setSequenceFinished] = useState<boolean>(false);

  // Eye-fatigue (20/20/20) sub-state machine
  // eyeStep: 0 = preparación (sin tiempo), 1 = enfoque distante (20s), 2 = lubricación (5s), 3 = fin
  const [eyeStep, setEyeStep] = useState<number>(0);
  const [eyeSeconds, setEyeSeconds] = useState<number>(0);
  const [eyeRunning, setEyeRunning] = useState<boolean>(false);

  // Reference for the background tick interval
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Continuous progress ring (0-100), driven by real elapsed time so it animates
  // smoothly from empty (start) to full (end) regardless of the integer countdown.
  const [ringProgress, setRingProgress] = useState<number>(0);
  const phaseElapsedRef = useRef<number>(0); // ms elapsed within the current phase

  // Reference for persistent video element (respiracion and future video routines)
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync video playback with timer state and routine changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.currentTime = 0;
      video.play();
    } else {
      video.pause();
    }
  }, [isPlaying, routineIndex]);

  // Dark mode — Opción A palette
  const dk = isDarkMode;
  const dmBgPage    = dk ? 'bg-[#2b3a4a]'  : 'bg-warm-canvas';
  const dmTextPage  = dk ? 'text-[#f0ede8]' : 'text-[#2f2e27]';
  const dmBgCard    = dk ? 'bg-[#44546a]'   : 'bg-white';
  const dmBgPanel   = dk ? 'bg-[#1e2b38]/50' : 'bg-[#eadecf]/50';
  const dmBorder    = dk ? 'border-[#808b9a]/40' : 'border-[#d5d2c8]';
  const dmBorderCard= dk ? 'border-[#808b9a]/30' : 'border-[#d3d0c9]';
  const dmBgActive  = dk ? 'bg-[#738290]'   : 'bg-[#30475c]';
  const dmBgInactive= dk ? 'bg-[#2b3a4a]/80 hover:bg-[#2b3a4a]' : 'bg-white/80 hover:bg-white';
  const dmTextPrimary   = dk ? 'text-[#f0ede8]' : 'text-[#222222]';
  const dmTextSecondary = dk ? 'text-[#c8d0d8]' : 'text-[#4d4c45]';
  const dmTextMuted     = dk ? 'text-[#9aabb8]' : 'text-[#716f67]';
  const dmBgFooter  = dk ? 'bg-[#1e2b38]'   : 'bg-[#eae5dd]';
  const dmBorderFooter = dk ? 'border-[#808b9a]/20' : 'border-[#dfdfdf]';
  const dmBgActionBlock= dk ? 'bg-[#44546a] border-[#738290]' : 'bg-[#faf8f4] border-[#30475c]';
  const dmTextAccent    = dk ? 'text-[#a8bfc9]' : 'text-[#30475c]';
  const dmBgRingTrack   = dk ? '#3d5265' : '#eae5dd';

  const currentRoutine = activeBreakRoutines[routineIndex];
  const currentStepData = currentRoutine.steps[activeStep];
  const TRANSITION_DURATION = 3.0; // 3 seconds transition for all exercises

  const isImageMirrored = (() => {
    if (currentRoutine.id === 'cervical') {
      if (activeStep === 1) return false; // Right cervical stretch (not mirrored)
      if (activeStep === 2) return true;  // Left cervical stretch (mirrored)
      return isMirrored;
    }
    if (currentRoutine.id === 'rotacion') {
      if (activeStep === 1 || activeStep === 3 || activeStep === 5) return false; // Left (real image, no mirror)
      if (activeStep === 2 || activeStep === 4 || activeStep === 6) return false; // Right (not mirrored)
      return isMirrored;
    }
    return isMirrored;
  })();

  // Dynamic helper to parse seconds from string duration (e.g., "12 segundos" -> 12)
  const getStepHoldDuration = (stepIdx: number, routIdx: number) => {
    const routine = activeBreakRoutines[routIdx];
    const step = routine.steps[stepIdx];
    if (!step) return 15;
    const num = parseInt(step.duration);
    const base = isNaN(num) ? 15 : num;
    return routine.id === 'respiracion' ? base + 1 : base;
  };

  // Helper to change routines cleanly — always pauses and resets to step 1
  const handleSetRoutineIndex = (newIndex: number) => {
    setIsPlaying(false);
    setRoutineIndex(newIndex);
    setActiveStep(0);
    setPrevStep(0);
    setPhase('hold');
    phaseElapsedRef.current = 0;
    setRingProgress(0);
    const firstStepDuration = getStepHoldDuration(0, newIndex);
    setSecondsRemaining(firstStepDuration);
    setSliderValue(0);
  };

  const handlePrevRoutine = () => {
    const newIdx = (routineIndex - 1 + activeBreakRoutines.length) % activeBreakRoutines.length;
    handleSetRoutineIndex(newIdx);
  };

  const handleNextRoutine = () => {
    const newIdx = (routineIndex + 1) % activeBreakRoutines.length;
    handleSetRoutineIndex(newIdx);
  };

  // Restart the whole body circuit from zero (used by the closing/hydration screen)
  const restartCircuit = () => {
    setSequenceFinished(false);
    setRoutineIndex(0);
    setActiveStep(0);
    setPrevStep(0);
    setPhase('hold');
    setIsMirrored(false);
    setSliderValue(0);
    phaseElapsedRef.current = 0;
    setRingProgress(0);
    setSecondsRemaining(getStepHoldDuration(0, 0));
    setIsPlaying(false);
  };

  // Restart only the current phase timer (countdown + progress ring)
  const restartPhaseTimer = () => {
    phaseElapsedRef.current = 0;
    setRingProgress(0);
    setSecondsRemaining(phase === 'hold'
      ? getStepHoldDuration(activeStep, routineIndex)
      : Math.floor(TRANSITION_DURATION));
  };

  // Close area dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (areaDropdownRef.current && !areaDropdownRef.current.contains(e.target as Node)) {
        setAreaDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelectArea = (area: string) => {
    setSelectedArea(area);
    localStorage.setItem('adium_area', area);
    setAreaDropdownOpen(false);
    // Fire GA4 event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'seleccionar_area', {
        event_category: 'registro_usuario',
        area_trabajo: area,
      });
    }
  };

  // Switch between body and eye-fatigue modes
  const goBodyMode = () => {
    setScreenMode('body');
    setEyeRunning(false);
  };
  const goEyesMode = () => {
    setScreenMode('eyes');
    setIsPlaying(false); // pause the body timer while in eye mode
    setEyeStep(0);
    setEyeSeconds(0);
    setEyeRunning(false);
  };

  // Eye exercise controls
  const startEyeExercise = () => {
    setEyeStep(1);     // jump from preparación straight to enfoque distante
    setEyeSeconds(20); // 20 segundos (regla 20/20/20)
    setEyeRunning(true);
  };
  const resetEyeExercise = () => {
    setEyeStep(0);
    setEyeSeconds(0);
    setEyeRunning(false);
  };

  // State Machine logic representing steps and routine rotations
  useEffect(() => {
    if (!isPlaying) {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }

    timerIntervalRef.current = setInterval(() => {
      setSecondsRemaining(prevSec => {
        if (prevSec <= 1) {
          // Transition when timer hits zero!
          if (phase === 'hold') {
            // Finished holding, check if it was the last step
            if (activeStep === currentRoutine.steps.length - 1) {
              // Last step of an exercise — is it also the last exercise of the sequence?
              if (routineIndex === activeBreakRoutines.length - 1) {
                // Whole circuit finished → stop and show the closing/hydration screen
                setSequenceFinished(true);
                setIsPlaying(false);
                return 0;
              }
              // Otherwise advance to the next exercise (no wrap-around looping)
              const nextRoutineIdx = routineIndex + 1;
              setRoutineIndex(nextRoutineIdx);
              // prevStep and sliderValue must be 0 (not the old routine's last step): the
              // slider would otherwise show/sweep the NEW routine's image stack during
              // the transition (sliderValue is set in this same batch to avoid a one-frame
              // flash of the wrong image before the slider effect runs)
              setPrevStep(0);
              setSliderValue(0);
              setActiveStep(0);
              setPhase('transition');
              return Math.floor(TRANSITION_DURATION);
            } else {
              // Finished holding, move towards next step
              const nextStepIndex = (activeStep + 1) % currentRoutine.steps.length;
              setPrevStep(activeStep);
              setActiveStep(nextStepIndex);
              // Video routines: skip transition, flow directly to next hold
              if (currentRoutine.steps[0]?.image.startsWith('video:')) {
                setPhase('hold');
                return getStepHoldDuration(nextStepIndex, routineIndex);
              }
              setPhase('transition');
              return Math.floor(TRANSITION_DURATION);
            }
          } else {
            // Finished transition, hold current step
            setPhase('hold');
            
            // If just transitioned back to step 0, auto-alternate the mirrored side so employees stretch BOTH sides!
            if (activeStep === 0) {
              setIsMirrored(prev => !prev);
            }

            return getStepHoldDuration(activeStep, routineIndex);
          }
        }
        return prevSec - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isPlaying, phase, activeStep, isMirrored, routineIndex, currentRoutine]);

  // Eye-fatigue (20/20/20) timer. Step 0 has no countdown (manual start). Step 1 is the
  // single 20-second distant-focus countdown; on reaching zero it goes to step 3 (fin, stop).
  useEffect(() => {
    if (screenMode !== 'eyes' || !eyeRunning) return;
    const id = setInterval(() => {
      setEyeSeconds(prev => {
        if (prev > 1) return prev - 1;
        // 20-second focus finished → done (no lubrication phase)
        if (eyeStep === 1) {
          setEyeStep(3);
          setEyeRunning(false);
          return 0; // ejercicio ocular finalizado (sin pantalla posterior)
        }
        return 0;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [screenMode, eyeRunning, eyeStep]);

  // Reset the ring whenever a new phase/step/routine begins (NOT on pause).
  useEffect(() => {
    phaseElapsedRef.current = 0;
    setRingProgress(0);
  }, [phase, activeStep, routineIndex]);

  // Drive the ring continuously from real elapsed time. Uses setInterval (not rAF) so it
  // keeps advancing even if the tab is backgrounded. Freezes (keeps accumulated elapsed)
  // when paused and resumes from where it left off.
  useEffect(() => {
    if (!isPlaying) return;
    const totalMs = (phase === 'hold' ? getStepHoldDuration(activeStep, routineIndex) : TRANSITION_DURATION) * 1000;
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      phaseElapsedRef.current += now - last;
      last = now;
      setRingProgress(Math.min(phaseElapsedRef.current / totalMs, 1) * 100);
    }, 50);
    return () => clearInterval(id);
  }, [isPlaying, phase, activeStep, routineIndex]);

  // Smooth frame interpolation logic using custom requestAnimationFrame
  useEffect(() => {
    if (phase === 'hold') {
      // Lock slider exactly to the target step when holding
      setSliderValue(activeStep);
      return;
    }

    // When transitioning, interpolate based on elapsed secondsRemaining
    let animId: number;
    const startValue = prevStep;
    
    // Normalize target step value to slide wrapping cleanly from last step to 0
    let targetValue = activeStep;
    const totalSteps = currentRoutine.steps.length;
    if (startValue === totalSteps - 1 && targetValue === 0) {
      // Loop wrapping effect helper
      targetValue = totalSteps; // interpolate forward, then wrap back after transition holds
    }

    const durationMs = TRANSITION_DURATION * 1000;
    const startTime = performance.now();

    const animateSlider = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      
      // Smooth step easing curve
      const easeInOutQuad = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      let val = startValue + (targetValue - startValue) * easeInOutQuad;
      if (val >= totalSteps) val = val - totalSteps; // wrap back safely
      
      setSliderValue(val);

      if (progress < 1) {
        animId = requestAnimationFrame(animateSlider);
      } else {
        setSliderValue(activeStep);
      }
    };

    animId = requestAnimationFrame(animateSlider);
    return () => cancelAnimationFrame(animId);
  }, [phase, activeStep, prevStep, currentRoutine, routineIndex]);

  // Dedicated component to render either legacy images or high-fidelity beautiful SVGs which are fully responsive
  function Illustration({ imageKey, isMirrored }: { imageKey: string; isMirrored: boolean }) {
    if (imageKey.startsWith('video:')) {
      const src = asset(imageKey.substring(6));
      return (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover select-none"
          style={{ pointerEvents: 'none' }}
        />
      );
    }

    if (!imageKey.startsWith('svg:')) {
      return (
        <img
          src={asset(imageKey)}
          alt="Pose de estiramiento"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover select-none"
          style={{ pointerEvents: 'none' }}
        />
      );
    }

    const type = imageKey.substring(4); // e.g., "wrist_warmup"

    return (
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#FAF8F5] to-[#EAE6DD] flex flex-col items-center justify-center p-6 select-none">
        <svg
          className="w-full h-[75%] grow text-[#30475c]"
          viewBox="0 0 200 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Target focus backdrop circle */}
          <circle cx="100" cy="120" r="75" stroke="#30475c" strokeWidth="1" strokeDasharray="3 4" opacity="0.12" />

          {/* Postural chair reference anchor */}
          <path d="M60 210 L140 210 M100 210 L100 170 M70 170 L130 170 M80 170 L85 110 M120 170 L115 110" stroke="#cdcac2" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
          
          {/* Base body silhouette */}
          <path d="M80 150 C80 120, 120 120, 120 150 L125 185 L75 185 Z" fill="#eae6dc" stroke="#cdcac2" strokeWidth="1.5" />

          {/* SVG Poses Switch Board */}
          {type === "wrist_warmup" && (
            <g>
              <circle cx="100" cy="98" r="18" fill="#e2dfd5" stroke="#bfbbb0" strokeWidth="2" />
              {/* Circulation ripples */}
              <circle cx="100" cy="142" r="26" stroke="#ff012f" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" className="animate-ping" style={{ transformOrigin: '100px 142px' }} />
              <circle cx="100" cy="142" r="16" stroke="#4992a8" strokeWidth="1.5" opacity="0.7" />
              {/* Joined hands */}
              <g className="animate-bounce" style={{ transformOrigin: '100px 142px', animationDuration: '2s' }}>
                <path d="M92 145 C92 135, 96 124, 100 124 C104 124, 108 135, 108 145 Z" fill="#ff012f" opacity="0.85" />
                <path d="M96 148 C96 142, 98 131, 100 131 C102 131, 104 142, 104 148 Z" fill="#30475c" />
                <line x1="82" y1="135" x2="88" y2="138" stroke="#ff012f" strokeWidth="2" strokeLinecap="round" />
                <line x1="118" y1="135" x2="112" y2="138" stroke="#ff012f" strokeWidth="2" strokeLinecap="round" />
              </g>
            </g>
          )}

          {type === "wrist_extension" && (
            <g>
              <circle cx="100" cy="85" r="18" fill="#e2dfd5" stroke="#bfbbb0" strokeWidth="2" />
              {/* Shoulder & arm */}
              <path d="M75 130 H120" stroke="#30475c" strokeWidth="12" strokeLinecap="round" />
              {/* Hand extended up */}
              <path d="M120 130 V102" stroke="#ff012f" strokeWidth="10" strokeLinecap="round" />
              {/* Support hand guiding */}
              <path d="M130 112 Q126 102, 118 102" stroke="#4992a8" strokeWidth="6" strokeLinecap="round" />
              {/* Flow arrows */}
              <path d="M136 102 L116 102 M122 97 L116 102 L122 107" stroke="#ff012f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" />
            </g>
          )}

          {type === "wrist_flexion" && (
            <g>
              <circle cx="100" cy="85" r="18" fill="#e2dfd5" stroke="#bfbbb0" strokeWidth="2" />
              {/* Arm */}
              <path d="M75 130 H120" stroke="#30475c" strokeWidth="12" strokeLinecap="round" />
              {/* Hand flexed down */}
              <path d="M120 130 V158" stroke="#ff012f" strokeWidth="10" strokeLinecap="round" />
              {/* Other hand pushing */}
              <path d="M130 148 Q126 158, 118 158" stroke="#4992a8" strokeWidth="6" strokeLinecap="round" />
              {/* Action arrows */}
              <path d="M136 158 L116 158 M122 153 L116 158 L122 163" stroke="#ff012f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" />
            </g>
          )}

          {type === "wrist_rotation" && (
            <g>
              <circle cx="100" cy="90" r="18" fill="#e2dfd5" stroke="#bfbbb0" strokeWidth="2" />
              <g className="animate-spin" style={{ transformOrigin: '100px 142px', animationDuration: '5s' }}>
                <circle cx="100" cy="142" r="24" stroke="#4992a8" strokeWidth="2" strokeDasharray="5 4" opacity="0.6" />
                <path d="M85 142 C85 128, 115 128, 115 142 S85 156, 85 142" fill="#30475c" stroke="#ff012f" strokeWidth="2.5" />
              </g>
              <path d="M132 142 A 32 32 0 0 1 68 142" stroke="#ff012f" strokeWidth="1.5" strokeDasharray="3 3" />
            </g>
          )}

          {type === "shoulder_chest_open" && (
            <g>
              <circle cx="100" cy="80" r="18" fill="#e2dfd5" stroke="#bfbbb0" strokeWidth="2" />
              {/* Expanded posture */}
              <path d="M100 108 C80 108, 65 115, 60 128 L68 180 L132 180 L140 128 C135 115, 120 108, 100 108 Z" fill="#EFF6F8" stroke="#4992a8" strokeWidth="2" />
              {/* Locked hands behind */}
              <path d="M86 162 L100 184 L114 162 Z" fill="#30475c" stroke="#ff012f" strokeWidth="2" />
              {/* Open vector pulses */}
              <path d="M54 118 Q40 132, 54 146" stroke="#ff012f" strokeWidth="3" strokeLinecap="round" className="animate-pulse" />
              <path d="M146 118 Q160 132, 146 146" stroke="#ff012f" strokeWidth="3" strokeLinecap="round" className="animate-pulse" />
            </g>
          )}

          {type === "shoulder_crossover" && (
            <g>
              <circle cx="100" cy="80" r="18" fill="#e2dfd5" stroke="#bfbbb0" strokeWidth="2" />
              <path d="M100 108 C80 108, 65 115, 60 128 L68 180 L132 180 L140 128 C135 115, 120 108, 100 108 Z" fill="#EAE6DC" />
              {/* Transversal crossover arm */}
              <path d="M62 130 H128" stroke="#30475c" strokeWidth="12" strokeLinecap="round" />
              {/* Locking vertical arm */}
              <path d="M112 114 V146" stroke="#ff012f" strokeWidth="12" strokeLinecap="round" />
              {/* Pulling force indicators */}
              <path d="M124 130 H138 M132 125 L138 130 L132 135" stroke="#4992a8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          )}

          {type === "shoulder_shrug" && (
            <g>
              <circle cx="100" cy="80" r="18" fill="#e2dfd5" stroke="#bfbbb0" strokeWidth="2" />
              {/* Moving shoulders back & down circle */}
              <g className="animate-spin" style={{ transformOrigin: '72px 122px', animationDuration: '4.5s' }}>
                <circle cx="72" cy="122" r="10" stroke="#ff012f" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="80" cy="122" r="3.5" fill="#30475c" />
              </g>
              <g className="animate-spin" style={{ transformOrigin: '128px 122px', animationDuration: '4.5s' }}>
                <circle cx="128" cy="122" r="10" stroke="#ff012f" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="120" cy="122" r="3.5" fill="#30475c" />
              </g>
              {/* Shoulder frame */}
              <path d="M66 130 C72 120, 128 120, 134 130" stroke="#30475c" strokeWidth="4" strokeLinecap="round" />
            </g>
          )}

          {type === "thoracic_start" && (
            <g>
              {/* Head */}
              <circle cx="100" cy="78" r="18" fill="#e2dfd5" stroke="#bfbbb0" strokeWidth="2" />
              {/* Torso erguido */}
              <path d="M100 96 C80 96, 65 108, 62 128 L68 178 L132 178 L138 128 C135 108, 120 96, 100 96 Z" fill="#EFF6F8" stroke="#7c5c3e" strokeWidth="2" />
              {/* Manos sobre muslos */}
              <path d="M74 155 L68 178" stroke="#7c5c3e" strokeWidth="8" strokeLinecap="round" />
              <path d="M126 155 L132 178" stroke="#7c5c3e" strokeWidth="8" strokeLinecap="round" />
              <ellipse cx="68" cy="182" rx="10" ry="5" fill="#7c5c3e" opacity="0.7" />
              <ellipse cx="132" cy="182" rx="10" ry="5" fill="#7c5c3e" opacity="0.7" />
              {/* Pies */}
              <ellipse cx="78" cy="215" rx="12" ry="5" fill="#cdcac2" />
              <ellipse cx="122" cy="215" rx="12" ry="5" fill="#cdcac2" />
              {/* Pulse indicador postura */}
              <path d="M100 60 V48 M95 54 L100 48 L105 54" stroke="#7c5c3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce" />
            </g>
          )}

          {type === "thoracic_ready" && (
            <g>
              {/* Head */}
              <circle cx="100" cy="78" r="18" fill="#e2dfd5" stroke="#bfbbb0" strokeWidth="2" />
              {/* Torso */}
              <path d="M100 96 C80 96, 65 108, 62 128 L68 178 L132 178 L138 128 C135 108, 120 96, 100 96 Z" fill="#EFF6F8" stroke="#7c5c3e" strokeWidth="2" />
              {/* Brazos con codos al frente */}
              <path d="M72 118 L60 108 L76 98" stroke="#7c5c3e" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M128 118 L140 108 L124 98" stroke="#7c5c3e" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
              {/* Manos entrelazadas en nuca */}
              <path d="M76 94 Q100 86 124 94" stroke="#7c5c3e" strokeWidth="6" strokeLinecap="round" />
              {/* Codos convergentes indicador */}
              <path d="M62 108 Q100 120 138 108" stroke="#7c5c3e" strokeWidth="2" strokeDasharray="4 3" opacity="0.5" />
              <circle cx="60" cy="108" r="5" fill="#7c5c3e" opacity="0.8" className="animate-pulse" />
              <circle cx="140" cy="108" r="5" fill="#7c5c3e" opacity="0.8" className="animate-pulse" />
            </g>
          )}

          {type === "thoracic_open" && (
            <g>
              {/* Head */}
              <circle cx="100" cy="78" r="18" fill="#e2dfd5" stroke="#bfbbb0" strokeWidth="2" />
              {/* Torso expandido */}
              <path d="M100 96 C78 96, 60 108, 56 128 L64 178 L136 178 L144 128 C140 108, 122 96, 100 96 Z" fill="#EFF6F8" stroke="#7c5c3e" strokeWidth="2.5" />
              {/* Brazos abiertos hacia atrás */}
              <path d="M66 118 L44 105 L62 92" stroke="#7c5c3e" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M134 118 L156 105 L138 92" stroke="#7c5c3e" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
              {/* Manos en nuca */}
              <path d="M62 88 Q100 78 138 88" stroke="#7c5c3e" strokeWidth="6" strokeLinecap="round" />
              {/* Flechas de apertura */}
              <path d="M48 105 L32 105 M38 100 L32 105 L38 110" stroke="#ff012f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" />
              <path d="M152 105 L168 105 M162 100 L168 105 L162 110" stroke="#ff012f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" />
              {/* Escápulas aproximadas indicator */}
              <path d="M82 130 Q100 138 118 130" stroke="#7c5c3e" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" className="animate-pulse" />
            </g>
          )}

          {type === "shoulder_overhead" && (
            <g>
              <circle cx="100" cy="94" r="16" fill="#e2dfd5" stroke="#bfbbb0" strokeWidth="2" />
              {/* Reaching vertical overhead */}
              <path d="M72 165 L72 132 L84 66" stroke="#30475c" strokeWidth="11" strokeLinecap="round" />
              <path d="M128 165 L128 132 L116 66" stroke="#30475c" strokeWidth="11" strokeLinecap="round" />
              <path d="M84 62 H116" stroke="#ff012f" strokeWidth="12" strokeLinecap="round" />
              {/* Traction dynamic arrow */}
              <path d="M100 48 V34 M95 40 L100 34 L105 40" stroke="#4992a8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce" />
            </g>
          )}
        </svg>

        {/* Brand label */}
        <span className="text-[10px] font-mono font-bold tracking-widest text-[#4992a8] uppercase bg-[#30475c]/10 px-3.5 py-1.5 rounded-full mt-auto">
          Biomecánica Adium
        </span>
      </div>
    );
  }

  return (
    <div id="active-break-root" className={`min-h-screen ${dmBgPage} ${dmTextPage} font-sans flex flex-col justify-between selection:bg-[#30475c]/20 overflow-x-hidden transition-colors duration-300`}>

      {/* HEADER */}
      <header className="w-full bg-[#e8001c] px-8 py-0 flex items-center shadow-md z-50 relative">
        <img
          src={asset('/images/logo_adium.webp')}
          alt="Adium"
          className="h-28 object-contain"
        />

        {/* Area selector */}
        <div className="ml-auto" ref={areaDropdownRef}>
          <button
            onClick={() => setAreaDropdownOpen(!areaDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-sm font-medium transition-all duration-200 border border-white/20"
          >
            <span className="text-white/60 text-xs font-normal mr-1">Área:</span>
            <span className="max-w-[180px] truncate">
              {selectedArea ?? 'Seleccionar'}
            </span>
            <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${areaDropdownOpen ? 'rotate-90' : ''}`} />
          </button>

          {/* Dropdown */}
          {areaDropdownOpen && (
            <div className="absolute right-8 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100]">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-xs font-bold text-[#30475c] uppercase tracking-wider">Seleccionar área de trabajo</p>
              </div>
              <ul className="max-h-72 overflow-y-auto py-2">
                {AREAS_TRABAJO.map(area => (
                  <li key={area}>
                    <button
                      onClick={() => handleSelectArea(area)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                        selectedArea === area
                          ? 'bg-[#30475c] text-white font-semibold'
                          : 'text-[#2f2e27] hover:bg-[#f5f3ef]'
                      }`}
                    >
                      {area}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-8 flex flex-col justify-center items-center relative">

        {/* DUAL MODE SELECTOR — Cuerpo vs Fatiga Visual */}
        <div id="mode-selector" className="w-full max-w-3xl mb-6">
          <div className={`flex items-center gap-2 ${dmBgPanel} p-2 rounded-[20px] border ${dmBorder}`}>
            <button
              onClick={goBodyMode}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                screenMode === 'body'
                  ? `${dmBgActive} text-white shadow-md`
                  : `${dmTextMuted} ${dk ? 'hover:bg-[#44546a]/60' : 'hover:bg-white/60'}`
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Pausas Activas</span>
            </button>
            <button
              onClick={goEyesMode}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                screenMode === 'eyes'
                  ? `${dmBgActive} text-white shadow-md`
                  : `${dmTextMuted} ${dk ? 'hover:bg-[#44546a]/60' : 'hover:bg-white/60'}`
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Fatiga Visual</span>
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 ${
                dk
                  ? 'bg-[#738290]/30 hover:bg-[#738290]/50 text-[#f0ede8] border-[#808b9a]/40'
                  : 'bg-white/80 hover:bg-white text-[#30475c] border-[#d3d0c9]'
              }`}
              title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              aria-label={isDarkMode ? "Modo claro" : "Modo oscuro"}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* ============ EYE-FATIGUE MODE PANEL ============ */}
        {screenMode === 'eyes' && (
          <div id="eye-panel" className="w-full max-w-3xl flex flex-col items-center">
            {/* Header: acción a realizar */}
            <div className={`w-full ${dk ? 'bg-[#44546a] border-[#738290]' : 'bg-[#faf8f4] border-[#1f7d96]'} border-l-4 p-6 rounded-r-[24px] shadow-xs mb-6`}>
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#1f7d96] mb-2">¿Qué debe hacer ahora?</h4>
              <p className={`text-xl font-bold ${dmTextPrimary} leading-relaxed`}>
                Desvía la mirada de la pantalla e identifica un punto u objeto lejano en la oficina (ejemplo: un cuadro, una ventana o planta).
              </p>
            </div>

            <div className={`w-full ${dmBgCard} rounded-[32px] border ${dmBorder} shadow-sm p-6 sm:p-10 flex flex-col items-center`}>

              {/* ===== BIG HIGH-CONTRAST TIMER (visible al apartar la mirada) ===== */}
              {(() => {
                const total = 20;
                const displayNum = eyeStep === 0 ? 20 : eyeSeconds;
                const progress = eyeStep === 0 ? 0 : (total - eyeSeconds) / total;
                const R = 130;
                const C = 2 * Math.PI * R;
                return (
                  <div className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 300 300">
                      <circle cx="150" cy="150" r={R} stroke={dk ? '#4a6275' : '#e7eef0'} strokeWidth="20" fill="transparent" />
                      <circle
                        cx="150" cy="150" r={R}
                        stroke="#1f7d96" strokeWidth="20" fill="transparent" strokeLinecap="round"
                        strokeDasharray={C}
                        strokeDashoffset={C * (1 - progress)}
                        style={{ transition: 'stroke-dashoffset 1000ms linear' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-[7rem] sm:text-[8rem] font-display font-extrabold ${dk ? 'text-[#f0ede8]' : 'text-[#16222b]'} font-mono leading-none tabular-nums`}>
                        {displayNum}
                      </span>
                      <span className={`text-sm font-bold ${dk ? 'text-[#9aabb8]' : 'text-[#5f7a83]'} uppercase tracking-[0.3em] mt-1`}>Segundos</span>
                    </div>
                  </div>
                );
              })()}

              {/* PLAY / CONTROL BUTTON (debajo del timer) */}
              <div className="mt-7 flex flex-col items-center gap-3">
                {eyeStep === 0 && (
                  <button
                    onClick={startEyeExercise}
                    className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold uppercase tracking-wider bg-[#1f7d96] hover:bg-[#186072] text-white shadow-lg transition-all duration-300"
                  >
                    <Play className="w-5 h-5 fill-white text-white" />
                    Iniciar 20/20/20
                  </button>
                )}
                {eyeStep === 1 && (
                  <button
                    onClick={resetEyeExercise}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${dk ? 'text-[#9aabb8] hover:bg-[#44546a]' : 'text-[#5f7a83] hover:bg-[#eef3f4]'}`}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reiniciar
                  </button>
                )}
                {eyeStep === 3 && (
                  <button
                    onClick={resetEyeExercise}
                    className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold uppercase tracking-wider bg-[#1f7d96] hover:bg-[#186072] text-white shadow-lg transition-all duration-300"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Repetir ejercicio
                  </button>
                )}

                {/* Done message */}
                {eyeStep === 3 && (
                  <p className={`text-center text-base ${dmTextSecondary} max-w-md mt-1 leading-relaxed`}>
                    ¡Vista descansada! Repite este ejercicio cada 20 minutos frente a la pantalla.
                  </p>
                )}
              </div>

            </div>

            {/* ¿Por qué sirve? + recomendaciones ergonómicas */}
            <div className="w-full mt-8 space-y-6">
              <div className="px-2">
                <h4 className={`text-xs uppercase font-bold tracking-widest ${dmTextMuted} mb-2`}>¿Por qué sirve este ejercicio? (Regla médica 20/20/20)</h4>
                <p className={`text-base ${dmTextSecondary} font-light leading-relaxed`}>
                  Al trabajar frente a monitores, la mirada se enfoca permanentemente en un plano fijo y cercano. Esto fatiga constantemente el músculo ciliar de tu ojo. Estirar la mirada a 20 pies (mínimo 6 metros) por 20 segundos permite que el músculo ocular se relaje por completo, previniendo la miopía de acomodación y el enrojecimiento.
                </p>
              </div>

              <div className="px-2">
                <h4 className={`text-xs font-bold tracking-wider ${dmTextMuted} uppercase mb-3`}>Recomendaciones extra para la salud visual</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className={`${dmBgCard} border ${dk ? 'border-[#808b9a]/30' : 'border-[#e2ddd5]'} rounded-2xl p-4`}>
                    <h5 className={`text-[11px] font-bold uppercase tracking-wider ${dmTextAccent} mb-1.5`}>Brillo de monitor</h5>
                    <p className={`text-xs ${dmTextSecondary} leading-relaxed`}>Combina el brillo del monitor con la luminosidad del cuarto para evitar contrastes agresivos.</p>
                  </div>
                  <div className={`${dmBgCard} border ${dk ? 'border-[#808b9a]/30' : 'border-[#e2ddd5]'} rounded-2xl p-4`}>
                    <h5 className={`text-[11px] font-bold uppercase tracking-wider ${dmTextAccent} mb-1.5`}>Distancia de trabajo</h5>
                    <p className={`text-xs ${dmTextSecondary} leading-relaxed`}>Coloca la pantalla a 50-60 cm de distancia de tu cara (el largo de tu brazo).</p>
                  </div>
                  <div className={`${dmBgCard} border ${dk ? 'border-[#808b9a]/30' : 'border-[#e2ddd5]'} rounded-2xl p-4`}>
                    <h5 className={`text-[11px] font-bold uppercase tracking-wider ${dmTextAccent} mb-1.5`}>Lubricación natural</h5>
                    <p className={`text-xs ${dmTextSecondary} leading-relaxed`}>Ante pantallas parpadeamos un 70% menos. Haz pausas deliberadas para parpadear consciente.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ BODY CLOSING / HYDRATION SCREEN ============ */}
        {screenMode === 'body' && sequenceFinished && (
          <div id="closing-screen" className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* COLUMN 1: COMPLETION IMAGE FRAME (mirrors the posture frame) */}
            <div className="lg:col-span-12 xl:col-span-5 flex flex-col items-center justify-center">

              {/* Session badge (mirrors the Sector badge) */}
              <div className="mb-4 text-center">
                <span className="text-xs font-bold text-[#716f67] tracking-wider uppercase">Sesión completada</span>
                <div className="mt-1 flex items-center justify-center">
                  <span className="bg-[#3e8e6b]/12 text-[#2f7a59] py-0.5 px-3 rounded-lg border border-[#3e8e6b]/25 font-mono text-sm uppercase">
                    Hidratación y movimiento
                  </span>
                </div>
              </div>

              {/* Poster Frame */}
              <div className="relative bg-white p-4.5 rounded-[36px] border border-[#d3d0c9] shadow-xl w-full max-w-[340px] sm:max-w-[360px] md:max-w-[380px] lg:max-w-[390px] overflow-hidden">
                {/* Completion badge */}
                <div className="absolute top-8 left-8 z-20 bg-[#2f7a59] text-white font-mono text-[10px] uppercase tracking-wider py-1.5 px-3.5 rounded-full font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3" />
                  Completo 100%
                </div>

                {/* Locked Aspect Box — imagen de hidratación (búsqueda de agua) */}
                <div className="relative aspect-[9/16] w-full rounded-[24px] overflow-hidden bg-[#eef3f4]">
                  <img
                    src={asset('/images/busqueda_agua.webp')}
                    alt="Persona caminando a buscar agua"
                    className="absolute inset-0 w-full h-full object-cover select-none"
                    style={{ pointerEvents: 'none' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* COLUMN 2: CLOSING MESSAGE */}
            <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-center space-y-6">

              <div className="space-y-2">
                <span className="text-xs font-extrabold tracking-widest text-[#2f7a59] uppercase block">
                  ¡Felicidades por cuidar tu cuerpo!
                </span>
                <h2 className={`font-display font-extrabold text-4xl sm:text-5xl ${dmTextPrimary} tracking-tight leading-tight`}>
                  Ciclo de Pausas Finalizado con Éxito
                </h2>
              </div>

              {/* Recommendation card */}
              <div className={`${dmBgCard} p-6 sm:p-8 rounded-[28px] border ${dmBorder} shadow-sm space-y-5`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#3e8e6b]/12 flex items-center justify-center shrink-0">
                    <Droplets className="w-5 h-5 text-[#2f7a59]" />
                  </div>
                  <div>
                    <h4 className={`font-display font-bold text-lg ${dmTextPrimary} leading-tight`}>Una recomendación más</h4>
                    <p className={`text-xs ${dmTextMuted}`}>Recomendación de Salud Ocupacional ADIUM</p>
                  </div>
                </div>

                <div className={`border-t ${dk ? 'border-[#808b9a]/20' : 'border-[#f0ece3]'} pt-5 space-y-3`}>
                  <p className={`text-lg font-bold ${dmTextPrimary} leading-relaxed`}>
                    ¡Fantástico trabajo cuidando tu salud! Has completado todas las secuencias de estiramiento.
                  </p>
                  <p className={`text-base ${dmTextSecondary} leading-relaxed`}>
                    Como última recomendación <span className={`font-bold ${dmTextAccent}`}>ahora desconéctate unos minutos de la pantalla, levántate de tu silla y camina un poco yendo a buscar agua para mantenerte hidratado.</span>
                  </p>
                  <p className={`text-sm ${dmTextMuted} font-light leading-relaxed`}>
                    Caminar de forma activa estira tus miembros inferiores, destraba tu columna lumbar después de estar sentado y reactiva de forma inmediata la circulación general de tu cuerpo.
                  </p>
                </div>
              </div>

              <button
                onClick={restartCircuit}
                className="self-start flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider bg-[#30475c] hover:bg-[#223342] text-white shadow-md transition-all duration-300"
              >
                <RotateCcw className="w-4 h-4" />
                Volver a iniciar el circuito
              </button>
            </div>
          </div>
        )}

        {/* ============ BODY ACTIVE-BREAK CONTENT ============ */}
        {screenMode === 'body' && !sequenceFinished && (
        <>
        {/* ROUTINE/EXERCISE CAROUSEL BAR (Top indicators matching Spanish language rules) */}
        <div id="routine-tabs" className="w-full mb-8">
          <div className={`flex items-center gap-3 ${dmBgPanel} p-2.5 rounded-[24px] border ${dmBorder}`}>
            {/* Arrow only — previous */}
            <button
              onClick={handlePrevRoutine}
              className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${dmBgInactive} ${dmTextAccent} border ${dmBorderCard} shadow-sm hover:scale-105 transition-all duration-200`}
              title="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Bubbles in a concrete aligned grid */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {activeBreakRoutines.map((routine, rIdx) => {
                const isActive = rIdx === routineIndex;
                return (
                  <button
                    key={routine.id}
                    onClick={() => handleSetRoutineIndex(rIdx)}
                    className={`px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider leading-tight text-center transition-all duration-300 ${
                      isActive
                        ? `${dmBgActive} text-white shadow-md`
                        : `${dmBgInactive} ${dk ? 'text-[#c8d0d8]' : 'text-[#525048]'} border ${dmBorderCard}`
                    }`}
                  >
                    {routine.name}
                  </button>
                );
              })}
            </div>

            {/* Arrow only — next */}
            <button
              onClick={handleNextRoutine}
              className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${dmBgInactive} ${dmTextAccent} border ${dmBorderCard} shadow-sm hover:scale-105 transition-all duration-200`}
              title="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Board Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* COLUMN 1: VISUAL POSTURE FRAME (9:16 locked high-fidelity rendering) */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col items-center justify-center">
            
            {/* Mirror State notification pill */}
            <div className="mb-4 text-center">
              <span className="text-xs font-bold text-[#716f67] tracking-wider uppercase">Sector</span>
              <div className="mt-1 flex flex-wrap items-center justify-center gap-2 text-xl font-display font-extrabold text-[#2c2b25]">
                <span className={`${dk ? 'bg-[#738290]/25 text-[#c8d0d8] border-[#738290]/40' : 'bg-[#4a92a8]/10 text-[#30475c] border-[#4a92a8]/20'} py-0.5 px-3 rounded-lg border font-mono text-sm uppercase`}>
                  {currentRoutine.targetArea}
                </span>
                <span className={`text-xs py-1 px-2.5 rounded-md font-bold uppercase tracking-wider ${
                  getStepSideStatus(currentRoutine.id, activeStep, isMirrored) === 'izquierdo'
                    ? 'bg-[#ff012f]/15 text-[#ff012f]'
                    : getStepSideStatus(currentRoutine.id, activeStep, isMirrored) === 'derecho'
                    ? 'bg-[#ff012f]/15 text-[#ff012f]'
                    : dk ? 'bg-[#808b9a]/20 text-[#9aabb8]' : 'bg-[#716f67]/15 text-[#716f67]'
                }`}>
                  {getStepSideStatus(currentRoutine.id, activeStep, isMirrored)}
                </span>
              </div>
            </div>

            {/* Poster Frame aspect-locked 9:16 */}
            <div id="posture-card-frame" className={`relative ${dmBgCard} p-4.5 rounded-[36px] border ${dmBorderCard} shadow-xl w-full max-w-[340px] sm:max-w-[360px] md:max-w-[380px] lg:max-w-[390px] overflow-hidden`}>
              
              {/* Sliding step progress badge */}
              <div className="absolute top-8 left-8 z-20 bg-black/75 backdrop-blur-md text-white font-mono text-[10px] uppercase tracking-wider py-1.5 px-3.5 rounded-full font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff012f] animate-pulse" />
                POSTURA {activeStep+1}/{currentRoutine.steps.length}
              </div>

              <div className="absolute top-8 right-8 z-20 flex gap-2">
                <div className="bg-[#30475c] text-white text-[10px] uppercase font-bold tracking-widest py-1.5 px-3 rounded-full">
                  {phase === 'hold' ? "Sostener" : "Transición"}
                </div>
              </div>

              {/* Locked Aspect Box */}
              <div className={`relative aspect-[9/16] w-full rounded-[24px] overflow-hidden bg-[#eadecf]/40 shadow-inner transition-transform duration-500 ${
                isImageMirrored ? "scale-x-[-1]" : ""
              }`}>
                
                {/* Persistent video layer — keyed to routine so it never remounts on step change */}
                {currentRoutine.steps[0]?.image.startsWith('video:') && (
                  <video
                    key={currentRoutine.id}
                    ref={videoRef}
                    src={asset(currentRoutine.steps[0].image.substring(6))}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover select-none z-10"
                    style={{ pointerEvents: 'none' }}
                  />
                )}

                {/* Dynamically Blended Images or Custom SVG Vectors */}
                {currentRoutine.steps.map((step, idx) => {
                  if (step.image.startsWith('video:')) return null;
                  const opacity = Math.max(0, 1 - Math.abs(sliderValue - idx));

                  return (
                    <div
                      key={`${currentRoutine.id}-${step.index}`}
                      className="absolute inset-0 transition-opacity duration-150"
                      style={{
                        opacity,
                        zIndex: opacity > 0.05 ? 10 : 1,
                        pointerEvents: 'none'
                      }}
                    >
                      <Illustration imageKey={step.image} isMirrored={isImageMirrored} />
                    </div>
                  );
                })}

                {/* Ambient vignette frame layout shadow */}
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/15 to-transparent pointer-events-none z-10" />
              </div>

            </div>
          </div>

          {/* COLUMN 2: LARGE INSTRUCTIONAL INFO DISPLAY */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-center space-y-8">
            
            {/* LARGE HEADER STEP COMPILER */}
            <div id="step-title-block" className="space-y-2">
              <h2 className={`font-display font-extrabold text-3xl sm:text-5xl ${dmTextPrimary} tracking-tight leading-tight`}>
                {currentRoutine.name}
              </h2>
            </div>

            {/* MAIN COUNTER & TIMER CIRCLE COMBINED BAR */}
            <div id="countdown-card" className={`${dmBgCard} p-6 sm:p-8 rounded-[32px] border ${dmBorder} shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden`}>
              <div className="flex-1 space-y-1">
                <span className={`text-xs font-bold ${dmTextAccent} uppercase tracking-wider block`}>
                  {currentRoutine.id === 'toracica' ? 'TIEMPO DE ESTIRAMIENTO TORÁCICO'
                    : currentRoutine.id === 'elongacion_triceps' ? 'TIEMPO DE ESTIRAMIENTO DE HOMBRO'
                    : currentRoutine.id === 'muneca_codo' && activeStep > 0 ? 'ELONGACIÓN DE EXTENSORES'
                    : 'TIEMPO DE CUMPLIMIENTO DE POSTURA'}
                </span>
                <p className={`text-2xl font-display font-bold ${dmTextPrimary}`}>
                  {currentRoutine.id === "respiracion"
                    ? ["Prepárese para comenzar", "Cierre los ojos suavemente", "Inhale profundamente por la nariz", "Sostenga el aire con calma", "Exhale lento y completamente"][activeStep] ?? "Respire conscientemente"
                    : (currentRoutine.id === "cervical" && (activeStep === 0 || activeStep === 3)) ||
                      (currentRoutine.id === "rotacion" && (activeStep === 0 || activeStep === 7)) ||
                      (currentRoutine.id === "toracica" && activeStep === 0) ||
                      (currentRoutine.id === "triceps" && activeStep === 0) ||
                      (currentRoutine.id === "elongacion_triceps" && activeStep === 0) ||
                      (currentRoutine.id === "muneca_codo" && activeStep === 0) ||
                      (currentRoutine.id === "rotacion_tronco" && activeStep === 0) ||
                      (currentRoutine.id === "piriforme" && activeStep === 0) ||
                      (currentRoutine.id === "bajando_tierra" && activeStep === 0)
                    ? "Póngase en posición"
                    : phase === 'hold'
                    ? "Sostenga el estiramiento fijamente"
                    : "Relaje hombros mientras la postura cambia"}
                </p>
                <div className={`flex items-center gap-2 text-xs font-semibold ${dmTextAccent} mt-1`}>
                  <span>Recomendación médica de pausa:</span>
                  <span className={`${dk ? 'bg-[#738290]/20' : 'bg-[#30475c]/12'} py-0.5 px-2.5 rounded-full font-bold`}>{currentStepData.duration} total</span>
                </div>

                {/* VISUAL PLAY PAUSE INTERACTIVE CONTROLS */}
                <div className={`flex flex-wrap items-center gap-2.5 pt-3.5 border-t ${dk ? 'border-[#808b9a]/20' : 'border-[#f0ece3]'} mt-3.5`}>
                  <button
                    id="btn-toggle-play"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                      isPlaying
                        ? dk ? 'bg-[#44546a] hover:bg-[#3a4a5e] text-[#f0ede8] border-[#808b9a]/30' : 'bg-[#efebe4] hover:bg-[#e4dfd6] text-[#222222] border-[#dfdacd]'
                        : dk ? 'bg-[#738290] hover:bg-[#6a7882] text-white border-transparent shadow-md' : 'bg-[#30475c] hover:bg-[#223342] text-white border-transparent shadow-[#30475c]/20 shadow-md'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className={`w-3.5 h-3.5 ${dk ? 'fill-[#f0ede8]' : 'fill-[#222222]'} text-current`} />
                        <span>Pausar Rotación</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-white text-white" />
                        <span>{currentRoutine.id === 'respiracion' && activeStep === 0 ? 'Iniciar Ciclo' : 'Reanudar Ciclo'}</span>
                      </>
                    )}
                  </button>

                  <button
                    id="btn-restart-phase"
                    onClick={restartPhaseTimer}
                    title="Reiniciar fase"
                    aria-label="Reiniciar fase"
                    className={`flex items-center justify-center w-9 h-9 rounded-full ${dk ? 'bg-[#44546a] hover:bg-[#3a4a5e] text-[#a8bfc9] border-[#808b9a]/30' : 'bg-[#efebe4] hover:bg-[#e4dfd6] text-[#30475c] border-[#dfdacd]'} border transition-all duration-300`}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Big Signage Countdown Timer */}
              <div id="progress-timer-circle" className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="44"
                    stroke={dk ? '#3d5265' : '#eae5dd'}
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="44"
                    stroke={phase === 'hold' ? "#30475c" : "#ff012f"}
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 44}
                    strokeDashoffset={2 * Math.PI * 44 * (1 - ringProgress / 100)}
                    style={{ transition: 'stroke 200ms linear' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-3xl font-display font-extrabold ${dmTextPrimary} font-mono leading-none`}>
                    {secondsRemaining}
                  </span>
                  <span className={`text-[9px] font-bold ${dmTextMuted} uppercase tracking-wider mt-1`}>
                    SEGUNDOS
                  </span>
                </div>
              </div>
            </div>

            {/* MASTER INSTRUCTIONS: TEXT FOCUS */}
            <div className="space-y-6">
              
              {/* Technical Instruction - Big display */}
              <div id="action-instruction-block" className={`${dmBgActionBlock} border-l-4 p-6 rounded-r-[24px] shadow-xs`}>
                <h4 className={`text-xs uppercase font-extrabold tracking-widest ${dmTextAccent} mb-2`}>
                  ¿QUÉ DEBE HACER AHORA?
                </h4>
                <p className={`text-xl font-bold ${dmTextPrimary} leading-relaxed`}>
                  {currentStepData.actionInstruction}
                </p>
              </div>

              {/* Anatomy context description */}
              <div className="px-2">
                <h4 className={`text-xs uppercase font-bold tracking-widest ${dmTextMuted} mb-2`}>
                  DETALLE DE LA POSTURA
                </h4>
                <p className={`text-base ${dmTextSecondary} font-light leading-relaxed`}>
                  {currentStepData.description}
                </p>
              </div>

            </div>

            {/* QUEUE TIMELINE OF STEPS */}
            <div id="timeline-block" className="pt-4">
              <h4 className={`text-xs font-bold tracking-wider ${dmTextMuted} uppercase mb-3`}>SECUENCIA DE MOVIMIENTO ({currentRoutine.name})</h4>
              <div className="grid grid-cols-4 gap-2">
                {currentRoutine.steps.map((step) => {
                  const isActive = activeStep === step.index;
                  const isPast = activeStep > step.index;
                  return (
                    <button
                      key={step.index}
                      onClick={() => {
                        setIsPlaying(false);
                        setActiveStep(step.index);
                        setPrevStep(step.index);
                        setPhase('hold');
                        phaseElapsedRef.current = 0;
                        setRingProgress(0);
                        setSecondsRemaining(getStepHoldDuration(step.index, routineIndex));
                        setSliderValue(step.index);
                      }}
                      className={`p-3 rounded-2xl border text-center transition-all duration-300 text-left ${
                        isActive
                          ? `${dmBgActive} ${dk ? 'border-[#738290]' : 'border-[#30475c]'} text-white shadow-md`
                          : isPast
                            ? `${dk ? 'bg-[#2b3a4a]/60 border-[#808b9a]/20 text-[#6a7a88]' : 'bg-[#faf8f5]/60 border-[#dfdacd]/70 text-[#9c9a92]'}`
                            : `${dk ? 'bg-[#44546a]/50 border-[#808b9a]/30 text-[#c8d0d8] hover:bg-[#44546a]' : 'bg-white border-[#e2ddd5] text-[#2f2e27] hover:bg-white/90'}`
                      }`}
                    >
                      <div className="text-[9px] uppercase tracking-wider opacity-80">Fase {step.index + 1}</div>
                      <div className="text-xs font-bold truncate mt-0.5 leading-tight">{step.title}</div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
        </>
        )}

      </main>

      {/* 3. FOOTER SIGNAGE STATUS */}
      <footer id="app-footer" className="w-full bg-[#44546a] py-2 px-8 shrink-0 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/80">
        {/* Logo lateral izquierdo */}
        <img
          src={asset('/images/logo_adium.webp')}
          alt="Adium"
          className="h-20 object-contain brightness-0 invert"
        />

        <div className="hidden md:block w-px h-10 bg-white/25" />

        <div className="flex flex-col md:flex-row items-center gap-3 text-white/70">
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4 text-white/50" />
            <span>Pantalla dinámica para pausas activas - 2026</span>
          </div>
          <span className="hidden md:inline font-light opacity-40">|</span>
          <p className="font-medium text-white/80">© 2026 Dr. Emiliano Figuerón</p>
          <span className="hidden md:inline font-light opacity-40">|</span>
          <p className="font-medium text-white/80">Salud Ocupacional ADIUM Uruguay</p>
        </div>
      </footer>

    </div>
  );
}
