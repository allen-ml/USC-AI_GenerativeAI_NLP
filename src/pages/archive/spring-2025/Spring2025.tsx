import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArchiveNavigation } from "../../../components";
import styles from "./Spring2025.module.css";

const Spring2025: React.FC = () => {
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  const toggleTopic = (topicId: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  const TopicRow: React.FC<{
    week: string;
    title: string;
    topicId: string;
    topics: string[];
    deliverable: string;
  }> = ({ week, title, topicId, topics, deliverable }) => {
    const isExpanded = expandedTopics.has(topicId);

    return (
      <tr className={styles.weekRow}>
        <td>{week}</td>
        <td className="text-start">
          {title}
          {isExpanded && (
            <div className={styles.collapsibleContent}>
              <ul>
                {topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
          )}
          <br />
          <button
            onClick={() => toggleTopic(topicId)}
            className={styles.expandButton}
            style={{ background: "none", border: "none", padding: 0 }}
          >
            {isExpanded ? "Expand Less" : "Expand More"}
          </button>
        </td>
        <td>{deliverable}</td>
      </tr>
    );
  };

  return (
    <div className={styles.spring2025Body}>
      <ArchiveNavigation semester="spring-2025" />

      <section
        id="overview"
        className={styles.section}
        style={{ marginTop: "20px" }}
      >
        <div className={styles.container}>
          <h2>Course Overview</h2>
          <p>
            Welcome to TAC 459 - Generative AI and Natural Language Processing
            (NLP) at the University of Southern California. This course is
            designed to immerse students in the rapidly evolving fields of
            Generative AI and NLP, providing hands-on experience with
            cutting-edge Machine Learning Techniques & LLMs. Throughout the
            semester, you'll explore how generative models are transforming
            industries, from text generation to conversational agents. Students
            will gain hands-on experience with tools such as Hugging Face,
            TensorFlow, and PyTorch, while learning about applications in
            conversational agents, text summarization, and machine translation.
            By the end, students will be prepared to tackle real-world
            challenges in AI-driven fields.
          </p>
        </div>
      </section>

      <hr className={styles.hrDivider} />

      <section id="contacts" className={styles.section}>
        <div className={`${styles.container} py-4`}>
          <div className="row">
            <div className="col-12 text-center">
              <h2>Instructors</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="text-center p-3">
                <img
                  src="/people/allen.jpg"
                  alt="Prof. Allen Bolourchi"
                  className={`${styles.fixedImage} rounded-circle mb-3`}
                />
                <h5>
                  <Link
                    to="/staff?id=allen_bolourchi"
                    style={{ color: "#990000" }}
                  >
                    Prof. Allen Bolourchi
                  </Link>
                </h5>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="text-center p-3">
                <img
                  src="/people/rezaJ.png"
                  alt="Prof. Reza Jafarkhani"
                  className={`${styles.fixedImage} rounded-circle mb-3`}
                />
                <h5>
                  <Link
                    to="/staff?id=reza_jafarkhani"
                    style={{ color: "#990000" }}
                  >
                    Prof. Reza Jafarkhani
                  </Link>
                </h5>
              </div>
            </div>
          </div>

          <hr className={styles.hrDivider} />

          <div className="row">
            <div className="col-12 text-center">
              <h2>Course Assistants</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="text-center p-3">
                <img
                  src="/archive/people/Rajeev_Dharmendra_Singh.jpg"
                  alt="Rajeev Singh"
                  className={`${styles.fixedImage} rounded-circle mb-3`}
                />
                <h5>
                  <Link
                    to="/staff?id=rajeev_singh"
                    style={{ color: "#990000" }}
                  >
                    Rajeev Singh
                  </Link>
                </h5>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="text-center p-3">
                <img
                  src="/archive/people/nitin.jpeg"
                  alt="Nitin Sai Bommi"
                  className={`${styles.fixedImage} rounded-circle mb-3`}
                />
                <h5>
                  <Link
                    to="/staff?id=nitin_sai_bommi"
                    style={{ color: "#990000" }}
                  >
                    Nitin Sai Bommi
                  </Link>
                </h5>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="text-center p-3">
                <img
                  src="/archive/people/varuna.JPG"
                  alt="Varuna"
                  className={`${styles.fixedImage} rounded-circle mb-3`}
                />
                <h5>
                  <Link
                    to="/staff?id=varuna_krishna_kolla"
                    style={{ color: "#990000" }}
                  >
                    Varuna Krishna Kolla
                  </Link>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className={styles.hrDivider} />

      <section id="schedules" className={`${styles.section} py-5`}>
        <div className={styles.container}>
          <h2 className="mb-4">Office Hours</h2>
          <div className="table-responsive">
            <table className="table table-bordered table-striped text-center">
              <thead className="table-dark">
                <tr>
                  <th>Instructor/Course Assistant</th>
                  <th>Mode</th>
                  <th>Day</th>
                  <th>Time Slot</th>
                  <th>Location</th>
                  <th>Meeting Link</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rajeev Singh</td>
                  <td>Online</td>
                  <td>Monday</td>
                  <td>11:00 AM - 1:00 PM</td>
                  <td>Zoom</td>
                  <td>
                    <a
                      href="https://usc.zoom.us/j/96998396690?pwd=mr6xwwjwvP1CPiLAe06NF636HEhHhH.1"
                      style={{ color: "#990000" }}
                    >
                      Meeting Link
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Reza Jafarkhani</td>
                  <td>Online + Offline (RRB 211)</td>
                  <td>Tuesday</td>
                  <td>2:30 PM - 3:30 PM</td>
                  <td>Zoom</td>
                  <td>
                    <a
                      href="https://usc.zoom.us/j/91374847273?pwd=1j65d6xvOTUXKSBbIBpk7iHyEQzd3e.1"
                      style={{ color: "#990000" }}
                    >
                      Meeting Link
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Allen Bolourchi</td>
                  <td>Online</td>
                  <td>Tuesday</td>
                  <td>7 PM - 8 PM</td>
                  <td>Zoom</td>
                  <td>
                    Email Professor atleast 48 hours before to Schedule(15
                    minutes meet)
                  </td>
                </tr>
                <tr>
                  <td>Rajeev Singh</td>
                  <td>Online</td>
                  <td>Wednesday</td>
                  <td>11:00 AM - 1:00 PM</td>
                  <td>Zoom</td>
                  <td>
                    <a
                      href="https://usc.zoom.us/j/96998396690?pwd=mr6xwwjwvP1CPiLAe06NF636HEhHhH.1"
                      style={{ color: "#990000" }}
                    >
                      Meeting Link
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Reza Jafarkhani</td>
                  <td>Online + Offline (RRB 211)</td>
                  <td>Thursday</td>
                  <td>2:30 PM - 3:30 PM</td>
                  <td>Zoom</td>
                  <td>
                    <a
                      href="https://usc.zoom.us/j/91374847273?pwd=1j65d6xvOTUXKSBbIBpk7iHyEQzd3e.1"
                      style={{ color: "#990000" }}
                    >
                      Meeting Link
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rajeev Singh</td>
                  <td>Online</td>
                  <td>Friday</td>
                  <td>11:00 AM - 1:00 PM</td>
                  <td>Zoom</td>
                  <td>
                    <a
                      href="https://usc.zoom.us/j/96998396690?pwd=mr6xwwjwvP1CPiLAe06NF636HEhHhH.1"
                      style={{ color: "#990000" }}
                    >
                      Meeting Link
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <hr className={styles.hrDivider} />

      <section id="schedule" className={`${styles.section} py-5`}>
        <div className={styles.container}>
          <h2 className="mb-4">Course Schedule</h2>
          <div className="table-responsive">
            <table className="table table-bordered table-striped text-center">
              <thead className="table-dark">
                <tr>
                  <th>Week</th>
                  <th>Topics</th>
                  <th>Deliverables</th>
                </tr>
              </thead>
              <tbody>
                <tr className="fw-bold text-center">
                  <td colSpan={3}>
                    Module 1: Introduction to Text Processing, NLP, and AI
                  </td>
                </tr>
                <TopicRow
                  week="1"
                  title="Introduction to NLP, Generative AI, and Text Processing"
                  topicId="topic1"
                  topics={[
                    "Course Overview",
                    "Historical Evolution of AI and NLP",
                    "Key Concepts in Machine Learning and NLP",
                    "Overview of NLP Applications in Various Domains",
                    "Basic Text Processing and Language Understanding",
                    "Challenges and Limitations in NLP",
                  ]}
                  deliverable="-"
                />
                <TopicRow
                  week="2"
                  title="Text Cleaning and Preprocessing"
                  topicId="topic2"
                  topics={[
                    "Text Cleaning and Preprocessing",
                    "Techniques for Noise Reduction",
                    "Text Normalization and Tokenization",
                    "Lemmatization and Stemming",
                    "Co-occurrence Matrix in Text Analysis",
                    "Feature Extraction from Text",
                    "Regular Expressions in Text Processing",
                    "Basic Overview of Word Embeddings",
                    "Overview of python libraries such as NLTK, Spacy, regex etc.",
                  ]}
                  deliverable="Assignment 1 Due"
                />
                <tr className="fw-bold text-center">
                  <td colSpan={3}>
                    Module 2: Fundamentals of Machine Learning for NLP
                  </td>
                </tr>
                <TopicRow
                  week="3"
                  title="Fundamentals of Machine Learning for NLP, Metrics, and Cross-Validation"
                  topicId="topic3"
                  topics={[
                    "Supervised Learning and Unsupervised Learning - Key Algorithms for NLP",
                    "Evaluation Metrics for NLP Models",
                    "Training, Validation, and Test Sets in Model Development",
                    "Overfitting and Underfitting in NLP",
                    "Cross-Validation Techniques",
                    "Introduction to Python ML Libraries",
                  ]}
                  deliverable="Assignment 2 Due"
                />
                <TopicRow
                  week="4"
                  title="Neural Networks and Deep Learning in NLP"
                  topicId="topic4"
                  topics={[
                    "Neural Networks and Deep Learning in NLP",
                    "Activation Functions and Network Topologies",
                    "Backpropagation and Gradient Descent",
                    "CNNs and RNNs for NLP",
                    "Advanced RNNs: LSTM and GRU",
                    "Sequence Modeling in NLP",
                    "Challenges in Deep Learning for NLP",
                    "Case Studies in Deep Learning for NLP",
                  ]}
                  deliverable="Assignment 3 Due"
                />
                <TopicRow
                  week="5"
                  title="Transformer Models and Attention Mechanisms"
                  topicId="topic5"
                  topics={[
                    "Transformer Models and Attention Mechanisms",
                    "Understanding the Transformer Architecture",
                    "Concepts of Self-Attention and Positional Encoding",
                    "Overview of BERT, GPT, and Transformer Variants",
                    "Applications of Transformer Models in NLP",
                    "Training Transformer Models for NLP Tasks",
                    "Challenges and Solutions with Transformer Models",
                  ]}
                  deliverable="Assignment 4 Due"
                />
                <tr className="fw-bold text-center">
                  <td colSpan={3}>
                    Module 3: Advanced NLP Techniques and Transformers
                  </td>
                </tr>
                <TopicRow
                  week="6"
                  title="Syntax, Parsing, Word Embeddings, and POS Tagging"
                  topicId="topic6"
                  topics={[
                    "Syntax, Parsing, Word Embeddings, and POS Tagging",
                    "Syntax in Natural Language Processing",
                    "Dependency and Constituency Parsing",
                    "Deep Dive into Word Embeddings",
                    "Word2Vec, GloVe, and FastText Embeddings",
                    "Using Embeddings in NLP Tasks",
                    "Part-of-Speech (POS) Tagging: Importance, Methods, and Tools",
                    "Practical Parsing, Embedding, and POS Tagging Techniques",
                    "Vector Database",
                  ]}
                  deliverable="Assignment 5 Due"
                />
                <TopicRow
                  week="7"
                  title="Semantic Analysis, Language Models, and Question Answering"
                  topicId="topic7"
                  topics={[
                    "Semantic Analysis, Language Models, and Question Answering",
                    "Semantic Role Labeling (SRL)",
                    "Knowledge Graphs in Semantic Analysis",
                    "Advances in Contextual Embeddings",
                    "Overview of Language Models in NLP",
                    "Introduction to Question Answering System and Utilizing Language Models",
                    "Challenges in QA and Semantic Analysis",
                    "Word Sense Disambiguation Techniques",
                  ]}
                  deliverable="Assignment 6 Due"
                />
                <TopicRow
                  week="8"
                  title="Text Classification and Machine Translation + Midterm Exam"
                  topicId="topic8"
                  topics={[
                    "MidTerm Exams!!",
                    "Text Classification and Machine Translation",
                    "Fundamentals of Text Classification",
                    "Techniques and Algorithms for Classification",
                    "Introduction to Machine Translation",
                    "Neural Machine Translation (NMT) models",
                    "Challenges and Evaluation Metrics for MT",
                    "Practical Implementation of MT Systems",
                  ]}
                  deliverable="-"
                />
                <tr className="fw-bold text-center">
                  <td colSpan={3}>
                    Module 4: Generative AI Applications and Project
                  </td>
                </tr>
                <TopicRow
                  week="9"
                  title="Advanced Topics in Machine Learning and NLP"
                  topicId="topic9"
                  topics={[
                    "Advanced Topics in Machine Learning and NLP",
                    "Deep Transfer Learning in NLP",
                    "Strategies for Addressing Data Imbalance",
                    "Model Interpretability and Explainability in NLP",
                    "Advanced Optimization Techniques in NLP",
                    "Utilizing Pre-Trained NLP Models",
                    "Case Studies of Advanced ML in NLP",
                  ]}
                  deliverable="Assignment 7 Due"
                />
                <TopicRow
                  week="10"
                  title="Named Entity Recognition, Information Retrieval and Search"
                  topicId="topic10"
                  topics={[
                    "Named Entity Recognition, Information Retrieval and Search",
                    "Advanced Techniques in NER",
                    "Contextual NER and Its Applications",
                    "Fundamentals of Information Retrieval",
                    "Deep Dive into TF-IDF and Co-occurrence Matrix",
                    "Search Engines and Indexing Techniques",
                    "Evaluation Metrics in Information Retrieval",
                    "Case Studies and Real-World Applications",
                  ]}
                  deliverable="Assignment 8 Due"
                />
                <TopicRow
                  week="11"
                  title="Advanced Machine Translation and Summarization"
                  topicId="topic11"
                  topics={[
                    "Advanced Machine Translation and Summarization",
                    "Advanced Techniques in Machine Translation",
                    "Handling Low-Resource Languages in MT",
                    "Text Summarization",
                    "Extractive vs. Abstractive Summarization",
                    "Challenges in Summarization",
                    "Evaluation of Summarization Techniques",
                    "Current Trends in MT and Summarization",
                  ]}
                  deliverable="Assignment 9 Due"
                />
                <TopicRow
                  week="12"
                  title="Speech Processing and Conversational AI"
                  topicId="topic12"
                  topics={[
                    "Speech Processing and Conversational AI",
                    "Basics of Speech Recognition",
                    "Challenges in Automatic Speech Recognition (ASR)",
                    "Design and Development of Conversational Agents",
                    "Evaluating Dialogue Systems in Conversational AI",
                    "Multimodal Interaction in Conversational AI",
                    "Natural Language Understanding in Conversational AI",
                    "Case Studies in Speech Processing and Conversational AI",
                  ]}
                  deliverable="Assignment 10 Due"
                />
                <tr className="fw-bold text-center">
                  <td colSpan={3}>Module 5: Generative AI</td>
                </tr>
                <TopicRow
                  week="13"
                  title="Generative AI, Products, Techniques, APIs, and Ethical Considerations"
                  topicId="topic13"
                  topics={[
                    "Generative AI, Products, Techniques, APIs, and Ethical Considerations",
                    "Generative Models in NLP (ChatGPT, BARD, Gemini, Llama)",
                    "Advanced Prompt Engineering: Few-shot, Chain-of-thought, and Self-Consistency",
                    "Expanding LLM Capabilities: Knowledge Generation Prompting and Program-aided (PAL)",
                    "Developing an API with MongoDB and ngrok, and interfacing via Postman",
                    "LLM Safety: Prompt Injection, Prompt Leaking, Jailbreaking",
                    "Responsible AI, Data Privacy, Ethical Considerations, and Governance in AI",
                    "Business Intelligence, Marketing, Analytics, and Brand Analysis Use Cases",
                    "Introduction to Product Management and Business Considerations",
                  ]}
                  deliverable="Assignment 11 Due"
                />
                <TopicRow
                  week="14"
                  title="Training and Fine-Tuning LLMs, Hugging Face, LangChain, and RAG"
                  topicId="topic14"
                  topics={[
                    "Training and Fine-Tuning LLMs, Hugging Face, LangChain, and RAG",
                    "RAG: Retrieval Augmented Generation",
                    "Training of Chat GPT with Reinforcement Learning, HITL, and Proximal Policy Optimization",
                    "Evaluation of LLMs: MMLU, HellaSwag Benchmark, ARC, WinoGrade, GSM-8k, Truthful QA, PIQA",
                    "LoRA and QLoRA for Efficient Model Adaptation",
                    "Fine Tuning LLMs, Best Practices and Challenges",
                    "Fine-Tuned LLMs Application",
                    "Overview and Practical Use of Hugging Face in NLP Based Products",
                    "Utilizing LangChain and Llama for Customized Language Models",
                  ]}
                  deliverable="Assignment 12 Due"
                />
                <TopicRow
                  week="15"
                  title="Course Review, Future Trends, and Project Presentations + Final Exam"
                  topicId="topic15"
                  topics={[
                    "Course Review, Future Trends, and Project Presentations + Final Exam",
                    "Recap of Key NLP and Generative AI Concepts",
                    "Discussion on the Future Trends in NLP and Generative AI",
                    "Student Project Presentations",
                    "Feedback and Review of Projects",
                    "Resources for Advanced Learning",
                    "Closing Remarks and Course Evaluation",
                  ]}
                  deliverable="Final Project Deliverables Due"
                />
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Spring2025;
