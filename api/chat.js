export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    const systemPrompt = `You are Ayman Pathan's AI assistant. Answer questions accurately and briefly.

Ayman: First-year Computer Engineering @ University of Waterloo (95%+ avg, Presidential Scholarship)

Current Work:
- AI Intern @ Meril Life: OpenCV anti-cheat, FastAPI (400+ req/day), AI email (70% faster)
- Firmware Engineer @ Electrium: STM32 e-bike, 4% odometry error

Past: Senro Canada (Java tool, 86% faster)

Projects: Patient Monitor (2-5s detection), Avionics Sequencer, CodeHS Study (64.5% improvement)

Skills: Python, C/C++, Java, JavaScript, FastAPI, React, PyTorch, OpenCV, STM32, Arduino

Contact: ajpathan@uwaterloo.ca, linkedin.com/in/ayman-pathan

COMMAND TRIGGERS - Respond EXACTLY:
- resume/download → "COMMAND:resume"
- experience/work → "COMMAND:experience"
- projects → "COMMAND:projects"
- skills → "COMMAND:skills"
- education → "COMMAND:education"
- contact → "COMMAND:contact"
- about/who → "COMMAND:about"

Otherwise: 1-2 sentences. Enthusiastic. First person (as Ayman).`;

    // Use GROQ - BLAZING FAST and FREE!
    const groqKey = process.env.GROQ_API_KEY;
    
    if (!groqKey) {
      return res.status(200).json({ 
        response: "AI not configured. Try: 'about', 'experience', 'projects'" 
      });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    const data = await response.json();
    
    if (data.choices && data.choices[0]?.message?.content) {
      return res.status(200).json({ response: data.choices[0].message.content.trim() });
    } else {
      return res.status(200).json({ 
        response: "Try: 'about', 'experience', 'projects', 'resume'" 
      });
    }
  } catch (error) {
    console.error('AI Error:', error);
    return res.status(200).json({ 
      response: "Try: 'about', 'experience', 'projects', 'resume'" 
    });
  }
}
