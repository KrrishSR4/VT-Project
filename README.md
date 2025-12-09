# 📚 AI Platform for Students  
### ⭐ An AI-powered Study Generator using React + TensorFlow.js + Deep Learning + NLP

**AI Platform for Students** is a next-generation, intelligent, browser-based study assistant.  
Just type ANY topic — and the AI instantly generates:

- 📝 **Notes**  
- 📖 **Simple Explanations**  
- 💻 **Code in Python, Java, JavaScript**  
- 🧪 **Examples**  
- ❓ **Quiz (MCQ, True/False, Short Answer)**  

Powered by **React**, **Tailwind**, **ShadCN UI**, **TensorFlow.js**, and **Transformer-based NLP**, this project acts as a full in-browser study generator.

---

# 🎯 What This App Does

Enter topics like:

- "Binary Search Trees"  
- "QuickSort"  
- "Operating System Threads"  
- "Neural Networks"  

And AI produces a **full structured study guide** automatically.

This is a modern blend of:

- NLP  
- Deep Learning  
- RAG (Retrieval-Augmented Generation)  
- React UI  
- TensorFlow.js inference  

All running **in your browser**.

---

# 🌟 Features

### 🔹 AI Study Material Generator  
Creates:
- High-quality notes  
- Simple English explanations  
- Multi-language code  
- Real-world examples  
- Quizzes  

### 🔹 TensorFlow.js Deep Learning  
- Transformer embedders (MiniLM / DistilBERT)  
- Embedding-based topic search  
- Client-side inference  

### 🔹 Beautiful Modern UI  
- Tailwind + ShadCN UI  
- Syntax-highlighted code  
- Dark + Light theme  
- Smooth animations  
- Tab-based layout for Notes | Code | Quiz | Examples

---

# 🧩 Datasets Used

AI IDE uses a modular retrieval pipeline that can read from multiple datasets.

### 🧑‍💻 Code Datasets
- CodeXGLUE → https://github.com/microsoft/CodeXGLUE  
- The Stack → https://huggingface.co/datasets/bigcode/the-stack  

### 📚 Notes & Explanations
- Wikipedia CS Articles → https://huggingface.co/datasets/wikipedia  
- ELI5 → https://huggingface.co/datasets/eli5  
- DS-NLP Notes → https://huggingface.co/datasets/TalTechNLP/DS-NLP-Notes  

### 📝 Quiz Datasets
- OpenBookQA → https://huggingface.co/datasets/openbookqa  
- BoolQ → https://huggingface.co/datasets/boolq  
- MCTest → https://huggingface.co/datasets/mctest  

> Note: Datasets are preprocessed offline.  
> TensorFlow.js performs inference inside browser using embedders + retrieval.

---

# 🧠 AI Pipeline Architecture


flowchart TD
A[User Topic Input] --> B[TFJS Transformer Embedder]
B --> C[Vector Similarity Search]
C --> D[RAG Dataset Retrieval Layer]
D --> E[AI Content Generators]
E --> F[Structured JSON Output]
F --> G[React UI Rendering]




#Core Pipeline Modules

topicEmbedder(topic)
retrieveRelevantData(embedding)
generateNotes(data, topic)
generateExplanation(data, topic)
generateCode(data, topic)
generateExamples(data, topic)
generateQuiz(data, topic)

return {
  notes,
  explanation,
  code: { python, java, javascript },
  examples,
  quiz
}

# working
 ┌───────────┐      ┌───────────────┐      ┌─────────────┐
 | User Topic │ ─→   | TFJS Embedder │ ─→   | Vector Search│
 └───────────┘      └───────────────┘      └─────────────┘

# Dataset Retrieval (RAG)

       ┌──────────────── Dataset Chunks ────────────────┐
       | Wikipedia | CodeXGLUE | ELI5 | MCTest | DS-NLP  |
       └─────────────────────────────────────────────────┘
                            ▲
                            │
                 ┌──────────┴──────────┐
                 |  Embedding Similarity│
                 └──────────┬──────────┘
                            ▼
                   Best-Matching Topics




# Content Generator Pipeline

NotesGen  ←─ Retrieved Data ─→ ExplanationGen
CodeGen   ←───────────────────→ ExampleGen
QuizGen   ←───────────────────→ Final JSON


# UI Rendering

┌──────────────────────────────┐
| Notes | Explanation | Code   |
| Examples | Quiz             |
└──────────────────────────────┘
              ▼
      Component Renderer


# Code Embedding System (Conceptual)

Code Embedding System (Conceptual)

# Embedding with TensorFlow.js

export async function topicEmbedder(topic: string) {
  const model = await loadModel();
  const embedding = model.embed(topic);
  return embedding.dataSync();
}


#  vector retrieval

export function retrieveRelevantData(embedding) {
  return vectorSearch(embedding, preprocessedChunks);
}


# JSON output format

return {
  notes,
  explanation,
  code: {
    python,
    java,
    javascript,
  },
  examples,
  quiz
}


# React Tab Rendering

<Tabs defaultValue="notes">
  <TabsTrigger value="notes">Notes</TabsTrigger>
  <TabsTrigger value="explanation">Explanation</TabsTrigger>
  <TabsTrigger value="code">Code</TabsTrigger>
  <TabsTrigger value="examples">Examples</TabsTrigger>
  <TabsTrigger value="quiz">Quiz</TabsTrigger>
</Tabs>


#  Folder_Structure

tensor-ide/
├── public/
├── src/
│   ├── ai/
│   │   ├── pipeline.ts
│   │   ├── embedding.ts
│   │   ├── retrieval.ts
│   │   └── generators.ts
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md

