import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Mail, Linkedin, ChevronRight, Circle, Loader2, Download } from 'lucide-react';

export default function Portfolio() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: '╔════════════════════════════════════════════════════════════════════╗' },
    { type: 'system', content: '║                 Welcome to Ayman Pathan\'s Portfolio                ║' },
    { type: 'system', content: '╚════════════════════════════════════════════════════════════════════╝' },
    { type: 'output', content: '' },
    { type: 'output', content: '👋 Hi! I\'m Ayman - AI/SWE Engineer Looking for Summer 2026 Co-op' },
    { type: 'output', content: '🎓 Computer Engineering @ University of Waterloo' },
    { type: 'output', content: '' },
    { type: 'ai', content: '💬 Ask me anything! Try: "show me your projects", "open resume", or "what\'s your experience?"' },
    { type: 'output', content: '' }
  ]);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const [cursorBlink, setCursorBlink] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const portfolioData = {
    name: "Ayman Pathan",
    title: "AI/ML Engineer × Embedded Systems Developer",
    email: "ajpathan@uwaterloo.ca",
    phone: "+1 437-313-7488",
    linkedin: "linkedin.com/in/ayman-pathan",
    education: "University of Waterloo - Computer Engineering (Honours), Sep 2025 – Present. Presidential Scholarship recipient (95%+ admission average)",
    
    experience: [
      {
        title: "AI Software Engineering Intern",
        company: "Meril Life Sciences",
        period: "Oct 2025 – Present",
        highlights: [
          "Built OpenCV-based anti-cheat system for remote interviews using gaze/eye-position, face-presence, and motion tracking",
          "Filtered 5,500-sample dataset and tuned detection thresholds to reduce false positives",
          "Developed Python/FastAPI backend integrating LlamaAPI to automate candidate screening workflows",
          "Supported 30 internal users and processed ~400 requests/day",
          "Delivered AI email generation module reducing drafting time by ~70%, saving ~3 hours/week per HR member",
          "Deployed 8 production FastAPI endpoints with validation and structured error handling"
        ]
      },
      {
        title: "Firmware Engineer",
        company: "Electrium Mobility Design Team (University of Waterloo)",
        period: "Sep 2025 – Present",
        highlights: [
          "Developed STM32-based embedded firmware for e-bike control system interfacing with VESC motor controllers and Bluetooth telemetry",
          "Implemented encoder-based sensing for speed/odometry and incline estimation",
          "Achieved ~4% odometry error across 12 tests and 35 km logged",
          "Defined and debugged comms + telemetry payloads (UART/CAN/BLE)"
        ]
      },
      {
        title: "Software Engineering Intern",
        company: "Senro Canada Inc.",
        period: "July 2024 – August 2024",
        highlights: [
          "Developed Java-based dataset management tool that automated dataset iteration and filtering",
          "Reduced dataset processing time by 86% (from 7 mins to 1 min)",
          "Integrated rotary encoders and embedded sensors to improve system feedback quality",
          "Improved reliability during testing and debugging cycles across 4 devices"
        ]
      }
    ],
    
    projects: [
      {
        name: "Voice-Activated Patient Emotion Monitoring System",
        tech: "OpenCV, DeepFace, FFT",
        period: "Oct 2025 – Nov 2025",
        description: "Engineered Raspberry Pi system detecting patient distress in 2-5 seconds using FFT audio + facial-expression checks (vs. ~4-hour nurse rounds making it ~720x faster). Tested on 10/10 simulated distress events with 0 false alerts during 6 hours of normal activity. Delivered working $200 prototype with 16 kHz audio sampling."
      },
      {
        name: "Smart Avionics Power Sequencer & Fault Manager",
        tech: "KiCad, Python",
        period: "Dec 2025",
        description: "Designed ERC/DRC-clean PCB converting 12V input to sequenced 5V and 3.3V rails, with software-controlled power enables and ADC voltage sense channels. Developed 9-state power-on state machine with 100 ms validation delays, voltage thresholds (4.75V / 3.15V), two retry attempts, and seven simulated fault scenarios."
      },
      {
        name: "The Impact of CodeHS on AP Computer Science Student Performance",
        tech: "Research Publication",
        period: "Sep 2025",
        description: "Conducted controlled study showing CodeHS improved AP CS outcomes by 64.5% vs 19.1%."
      }
    ],
    
    skills: {
      languages: ["Python", "C/C++", "Java", "JavaScript/TypeScript"],
      frameworks: ["FastAPI", "Node.js", "Firebase", "Git", "VSCode", "CLion", "Swagger UI", "React"],
      ml: ["PyTorch", "OpenCV", "MediaPipe", "YOLO", "NumPy", "LLM Integration", "Prompt Engineering"],
      embedded: ["STM32", "VESC", "ESP32", "Arduino", "Raspberry Pi", "encoders", "sensors", "PCB design"]
    }
  };

  useEffect(() => {
    const interval = setInterval(() => setCursorBlink(prev => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: () => [
      '',
      '═══════════════════════════════════════════════════════════════════════',
      '  AVAILABLE COMMANDS',
      '═══════════════════════════════════════════════════════════════════════',
      '',
      '  📝 about       Learn about me',
      '  💼 experience  View work experience',
      '  🚀 projects    See my projects',
      '  ⚡ skills      Technical skills',
      '  🎓 education   Education details',
      '  📧 contact     Contact information',
      '  📄 resume      Download resume',
      '  🧹 clear       Clear terminal',
      '',
      '  💬 OR JUST CHAT: Ask me anything naturally!',
      ''
    ],
    
    about: () => [],  // Special handling in handleCommand
    
    experience: () => {
      const lines = ['', 'WORK EXPERIENCE', '═'.repeat(70), ''];
      portfolioData.experience.forEach((exp, idx) => {
        lines.push(`[${idx + 1}] ${exp.title} @ ${exp.company}`);
        lines.push(`    ${exp.period}`);
        exp.highlights.forEach(h => lines.push(`    • ${h}`));
        lines.push('');
      });
      return lines;
    },
    
    projects: () => {
      const lines = ['', 'PROJECTS & PUBLICATIONS', '═'.repeat(70), ''];
      portfolioData.projects.forEach((proj, idx) => {
        lines.push(`[${idx + 1}] ${proj.name}`);
        if (proj.tech) lines.push(`    Tech: ${proj.tech}`);
        lines.push(`    ${proj.description}`);
        lines.push('');
      });
      return lines;
    },
    
    skills: () => [
      '',
      'TECHNICAL SKILLS',
      '═'.repeat(70),
      '',
      '┌─ Languages',
      `│  ${portfolioData.skills.languages.join(' • ')}`,
      '│',
      '├─ Frameworks & Tools',
      `│  ${portfolioData.skills.frameworks.join(' • ')}`,
      '│',
      '├─ ML/Computer Vision',
      `│  ${portfolioData.skills.ml.join(' • ')}`,
      '│',
      '└─ Embedded Systems',
      `   ${portfolioData.skills.embedded.join(' • ')}`,
      ''
    ],
    
    education: () => [
      '',
      'EDUCATION',
      '═'.repeat(70),
      '',
      portfolioData.education,
      ''
    ],
    
    contact: () => [
      '',
      'CONTACT',
      '═'.repeat(70),
      '',
      `📧 ${portfolioData.email}`,
      `📱 ${portfolioData.phone}`,
      `💼 ${portfolioData.linkedin}`,
      '',
      'Feel free to reach out!',
      ''
    ],
    
    resume: () => {
      const link = document.createElement('a');
      link.href = '/Resume-13.pdf';
      link.download = 'Ayman_Pathan_Resume.pdf';
      link.click();
      return [
        '',
        '📄 Downloading resume...',
        '█████████████████████████████ 100%',
        '✓ Resume downloaded successfully!',
        ''
      ];
    },
    
    clear: () => {
      setHistory([
        { type: 'output', content: '' },
        { type: 'system', content: '╔════════════════════════════════════════════════════════════════════╗' },
        { type: 'system', content: '║        Welcome to Ayman Pathan\'s AI-Powered Portfolio             ║' },
        { type: 'system', content: '╚════════════════════════════════════════════════════════════════════╝' },
        { type: 'output', content: '' },
        { type: 'output', content: '👋 Hi! I\'m Ayman - AI/SWE Engineer Looking for Summer 2026 Co-op' },
        { type: 'output', content: '🎓 Computer Engineering @ University of Waterloo' },
        { type: 'output', content: '' },
        { type: 'ai', content: '💬 Ask me anything! Try: "show me your projects", "open resume", or "what\'s your experience?"' },
        { type: 'output', content: '' }
      ]);
      return null;
    }
  };

  const callAI = async (userMessage) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('AI error:', error);
      return "Try direct commands: 'about', 'experience', 'projects', 'resume'";
    }
  };

  const handleCommand = async (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const newHistory = [...history, { type: 'input', content: `$ ${cmd}` }];
    setHistory(newHistory);

    const lowerCmd = trimmedCmd.toLowerCase();
    
    // Special handling for 'about' command to show image
    if (lowerCmd === 'about') {
      newHistory.push({ type: 'image', content: '/profile.jpg' });
      newHistory.push({ type: 'output', content: '' });
      newHistory.push({ type: 'output', content: '═'.repeat(70) });
      newHistory.push({ type: 'output', content: '  ABOUT ME' });
      newHistory.push({ type: 'output', content: '═'.repeat(70) });
      newHistory.push({ type: 'output', content: '' });
      newHistory.push({ type: 'output', content: 'Hello! I\'m Ayman Pathan, a first-year engineering student at the' });
      newHistory.push({ type: 'output', content: 'University of Waterloo, and this is my portfolio website.' });
      newHistory.push({ type: 'output', content: '' });
      newHistory.push({ type: 'output', content: 'Feel free to check it out to learn more about my experiences and' });
      newHistory.push({ type: 'output', content: 'background, and don\'t hesitate to connect with me.' });
      newHistory.push({ type: 'output', content: '' });
      newHistory.push({ type: 'output', content: 'I\'m highly ambitious, hardworking, and consistently driven to improve.' });
      newHistory.push({ type: 'output', content: 'I\'m actively seeking a 2026 internship to apply my skills, grow quickly,' });
      newHistory.push({ type: 'output', content: 'and contribute to challenging engineering work.' });
      newHistory.push({ type: 'output', content: '' });
      newHistory.push({ type: 'output', content: '📧 Contact me: ajpathan@uwaterloo.ca' });
      newHistory.push({ type: 'output', content: '💼 LinkedIn: linkedin.com/in/ayman-pathan' });
      newHistory.push({ type: 'output', content: '' });
      setHistory(newHistory);
      return;
    }
    
    if (commands[lowerCmd]) {
      const output = commands[lowerCmd]();
      if (output) {
        output.forEach(line => newHistory.push({ type: 'output', content: line }));
      }
      setHistory(newHistory);
      return;
    }

    setIsLoading(true);
    newHistory.push({ type: 'output', content: '🤖 Thinking...' });
    setHistory(newHistory);

    const aiResponse = await callAI(trimmedCmd);
    const historyWithoutThinking = newHistory.slice(0, -1);
    
    if (aiResponse.startsWith('COMMAND:')) {
      const commandToRun = aiResponse.split(':')[1].trim();
      
      // Special handling for about command from AI
      if (commandToRun === 'about') {
        historyWithoutThinking.push({ type: 'image', content: '/profile.jpg' });
        historyWithoutThinking.push({ type: 'output', content: '' });
        historyWithoutThinking.push({ type: 'output', content: '═'.repeat(70) });
        historyWithoutThinking.push({ type: 'output', content: '  ABOUT ME' });
        historyWithoutThinking.push({ type: 'output', content: '═'.repeat(70) });
        historyWithoutThinking.push({ type: 'output', content: '' });
        historyWithoutThinking.push({ type: 'output', content: 'Hello! I\'m Ayman Pathan, a first-year engineering student at the' });
        historyWithoutThinking.push({ type: 'output', content: 'University of Waterloo, and this is my portfolio website.' });
        historyWithoutThinking.push({ type: 'output', content: '' });
        historyWithoutThinking.push({ type: 'output', content: 'Feel free to check it out to learn more about my experiences and' });
        historyWithoutThinking.push({ type: 'output', content: 'background, and don\'t hesitate to connect with me.' });
        historyWithoutThinking.push({ type: 'output', content: '' });
        historyWithoutThinking.push({ type: 'output', content: 'I\'m highly ambitious, hardworking, and consistently driven to improve.' });
        historyWithoutThinking.push({ type: 'output', content: 'I\'m actively seeking a 2026 internship to apply my skills, grow quickly,' });
        historyWithoutThinking.push({ type: 'output', content: 'and contribute to challenging engineering work.' });
        historyWithoutThinking.push({ type: 'output', content: '' });
        historyWithoutThinking.push({ type: 'output', content: '📧 Contact me: ajpathan@uwaterloo.ca' });
        historyWithoutThinking.push({ type: 'output', content: '💼 LinkedIn: linkedin.com/in/ayman-pathan' });
        historyWithoutThinking.push({ type: 'output', content: '' });
      } else if (commands[commandToRun]) {
        const output = commands[commandToRun]();
        if (output) {
          output.forEach(line => historyWithoutThinking.push({ type: 'output', content: line }));
        }
      }
    } else {
      historyWithoutThinking.push({ type: 'ai', content: `💬 ${aiResponse}` });
      historyWithoutThinking.push({ type: 'output', content: '' });
    }
    
    setHistory(historyWithoutThinking);
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-green-400 font-mono p-4 md:p-8">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,255,0,0.03)_50%,transparent_100%)] bg-[length:100%_4px] animate-scan" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,255,0,0.03)_50%,transparent_100%)] bg-[length:4px_100%]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Terminal Window */}
        <div className="bg-gray-900/90 backdrop-blur-sm border-2 border-green-500/40 rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.2)]">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-green-500/30 bg-gray-800/50">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <Circle className="w-3 h-3 fill-red-500 text-red-500" />
                <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                <Circle className="w-3 h-3 fill-green-500 text-green-500" />
              </div>
              <Terminal className="w-4 h-4 ml-2" />
              <span className="text-sm font-semibold">ayman@portfolio ~ AI-Powered</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="mailto:ajpathan@uwaterloo.ca?subject=Opportunity%20from%20Your%20Portfolio&body=Hi%20Ayman," className="hover:text-green-300 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com/in/ayman-pathan" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            onClick={() => inputRef.current?.focus()}
            className="bg-black/80 p-6 h-[65vh] overflow-y-auto cursor-text"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(34, 197, 94, 0.5) transparent' }}
          >
            {history.map((item, idx) => (
              <div key={idx}>
                {item.type === 'image' ? (
                  <div className="flex justify-center my-4">
                    <div className="w-32 h-32 rounded-lg border-2 border-green-400 overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                      <img 
                        src={item.content} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="w-full h-full bg-green-500/20 flex items-center justify-center text-green-400 text-4xl font-bold">AP</div>';
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={`mb-1 ${
                    item.type === 'input' ? 'text-green-400 font-semibold' : 
                    item.type === 'error' ? 'text-red-400' : 
                    item.type === 'ai' ? 'text-cyan-300' :
                    item.type === 'system' ? 'text-green-500 font-bold' :
                    'text-green-300/90'
                  }`}>
                    {item.type === 'input' && <ChevronRight className="inline w-3 h-3 mr-1" />}
                    <span className="whitespace-pre-wrap">{item.content}</span>
                  </div>
                )}
              </div>
            ))}

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center mt-2">
              <span className="text-green-400 mr-2 font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-green-400 font-medium"
                autoFocus
                spellCheck="false"
                autoComplete="off"
                placeholder={isLoading ? "Processing..." : "Type anything or try 'help'..."}
                disabled={isLoading}
              />
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400 ml-2" />
              ) : (
                <span className={`ml-1 w-2 h-5 bg-green-400 ${cursorBlink ? 'opacity-100' : 'opacity-0'}`} />
              )}
            </form>
          </div>

          {/* Status Bar */}
          <div className="px-4 py-2 border-t border-green-500/30 bg-gray-800/50 text-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-green-400">● ONLINE</span>
              <span className="text-gray-500">|</span>
              <span className="text-cyan-300">🤖 AI-Powered</span>
            </div>
            <div className="text-gray-400">
              Lines: {history.length}
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { cmd: 'about', icon: '👤', label: 'About' },
            { cmd: 'experience', icon: '💼', label: 'Experience' },
            { cmd: 'projects', icon: '🚀', label: 'Projects' },
            { cmd: 'skills', icon: '⚡', label: 'Skills' },
            { cmd: 'education', icon: '🎓', label: 'Education' },
            { cmd: 'contact', icon: '📧', label: 'Contact' },
            { cmd: 'resume', icon: '📄', label: 'Resume' },
            { cmd: 'help', icon: '❓', label: 'Help' }
          ].map(({ cmd, icon, label }) => (
            <button
              key={cmd}
              onClick={() => {
                setInput(cmd);
                handleCommand(cmd);
                setInput('');
              }}
              disabled={isLoading}
              className="group bg-gray-900/80 backdrop-blur-sm border border-green-500/30 hover:border-green-500 text-green-400 px-4 py-3 rounded transition-all duration-300 hover:bg-green-500/10 hover:scale-105 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center gap-1"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
              <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
            </button>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-6 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-4 text-center">
          <p className="text-green-400/80 text-sm">
            💬 <span className="font-bold text-green-300">Chat naturally!</span> Try: "tell me about your AI projects" or "open resume"
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap');
        
        * {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        .animate-scan {
          animation: scan 10s linear infinite;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.4);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.7);
        }
      `}</style>
    </div>
  );
}
