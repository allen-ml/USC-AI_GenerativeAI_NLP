import React from "react";
import styles from "./Fall2024.module.css";

const Fall2024: React.FC = () => {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.banner}>
          <img
            src="/usc-logo.png"
            alt="USC Logo"
            className={styles.bannerImg}
          />
          <div>
            <p>
              <b>
                TAC-459: Generative AI and Natural Language Processing (NLP)
              </b>
            </p>
          </div>
        </div>

        <div className={styles.header}>
          <p>
            Welcome to TAC 459 - Generative AI and Natural Language Processing
            (NLP) at the University of Southern California. This course is
            designed to immerse students in the rapidly evolving fields of
            Generative AI and NLP, providing hands-on experience with
            cutting-edge Machine Learning Techniques & LLMs. Throughout the
            semester, you'll explore how generative models are transforming
            industries, from text generation to conversational agents. By the
            end of the course, you'll have developed a solid understanding of
            the theoretical foundations and practical applications of Generative
            AI & AI in NLP, equipping you with the skills to tackle real-world
            challenges in this exciting domain.
          </p>
        </div>

        <ul className={styles.details}>
          <li>
            <strong>Time:</strong> Mondays, 5:00pm-8:20pm PST
          </li>
          <li>
            <strong>Location:</strong> SOS B4
          </li>
          <li>
            <strong>Discussion:</strong> Piazza
          </li>
          <li>
            <strong>Contact:</strong> Students should use Piazza for any
            course-related questions. For external inquiries, personal matters,
            or emergencies, you can email the Course Assistants with Professor
            in CC. Please do not forget to keep Professor in loop.
          </li>
        </ul>

        <div className={styles.staffSection}>
          <div className={styles.staffGrid}>
            <div>
              <h4>Instructor</h4>
              <div className={styles.staffMember}>
                <img
                  src="/people/allen.jpg"
                  alt="Instructor Photo"
                  className={styles.staffImg}
                />
                <div>
                  <h5>
                    <a
                      href="/staff?id=allen_bolourchi"
                      className={styles.staffName}
                    >
                      Prof. Allen Bolourchi
                    </a>
                  </h5>
                  <p className={styles.staffInfo}>
                    Email: bolourch@usc.edu
                    <br />
                    <a href="https://www.linkedin.com/in/allenbolourchi/">
                      LinkedIn
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4>Lead Course Assistant</h4>
              <div className={styles.staffMember}>
                <img
                  src="/archive/people/Rajeev_Dharmendra_Singh.jpg"
                  alt="TA Photo"
                  className={styles.staffImg}
                />
                <div>
                  <h5>
                    <a
                      href="/staff?id=rajeev_singh"
                      className={styles.staffName}
                    >
                      Rajeev Singh
                    </a>
                  </h5>
                  <p className={styles.staffInfo}>
                    Email: rajeevdh@usc.edu
                    <br />
                    <a href="https://www.linkedin.com/in/rajeevsinghusc/">
                      LinkedIn
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4>Course Assistant</h4>
              <div className={styles.staffMember}>
                <img
                  src="/archive/people/nitin.jpeg"
                  alt="TA Photo"
                  className={styles.staffImg}
                />
                <div>
                  <h5>
                    <a
                      href="/staff?id=nitin_sai_bommi"
                      className={styles.staffName}
                    >
                      Nitin Sai Bommi
                    </a>
                  </h5>
                  <p className={styles.staffInfo}>
                    Email: nbommi@usc.edu
                    <br />
                    <a href="https://www.linkedin.com/in/nitin-sai-bommi/">
                      LinkedIn
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className={styles.scheduleTitle}>Office hours</h2>
        <table className={`table table-bordered ${styles.table}`}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>
                Instructor/Course Assistant
              </th>
              <th className={styles.tableHeader}>Mode</th>
              <th className={styles.tableHeader}>Day</th>
              <th className={styles.tableHeader}>Time Slot</th>
              <th className={styles.tableHeader}>Location</th>
              <th className={styles.tableHeader}>Meeting Link</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.weekRow}>
              <td>Rajeev Singh</td>
              <td>Online</td>
              <td>Monday</td>
              <td>10am - 11am</td>
              <td>Google Meet</td>
              <td>
                <a href="meet.google.com/rmc-qqom-vsb">
                  meet.google.com/rmc-qqom-vsb
                </a>
              </td>
            </tr>
            <tr className={styles.weekRow}>
              <td>Rajeev Singh</td>
              <td>In Person + Online</td>
              <td>Thursday</td>
              <td>11:30am - 12:30pm</td>
              <td>OHE Patio</td>
              <td>
                <a href="meet.google.com/rmc-qqom-vsb">
                  meet.google.com/rmc-qqom-vsb
                </a>
              </td>
            </tr>
            <tr className={styles.weekRow}>
              <td>Rajeev Singh</td>
              <td>Online</td>
              <td>Friday</td>
              <td>10am - 11am</td>
              <td>Google Meet</td>
              <td>
                <a href="meet.google.com/rmc-qqom-vsb">
                  meet.google.com/rmc-qqom-vsb
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <h2 className={styles.scheduleTitle}>Weekly Course Topics</h2>
        <p className={styles.officeHours}>
          Please visit the course syllabus on Brightspace for the latest changes
          to the syllabus.
        </p>

        <table className={`table table-bordered ${styles.table}`}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Date</th>
              <th className={styles.tableHeader}>Lecture</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.moduleHeader}>
              <td colSpan={2}>
                Module 1: Introduction to Text Processing, NLP and AI
              </td>
            </tr>
            <tr className={styles.weekRow}>
              <td>Week 1</td>
              <td>
                <b>Lecture 1: Introduction to NLP and AI</b>
                <br />
                <ul>
                  <li>Course Overview</li>
                  <li>Historical Evolution of AI and NLP</li>
                  <li>Key Concepts in Machine Learning and NLP</li>
                  <li>Overview of NLP Applications in Various Domains</li>
                  <li>Basic Text Processing and Language Understanding</li>
                  <li>Challenges and Limitations in NLP</li>
                </ul>
              </td>
            </tr>
            <tr className={styles.weekRow}>
              <td>Week 2</td>
              <td>
                <b>Lecture 2: Text Cleaning and Preprocessing</b>
                <br />
                <ul>
                  <li>Text Cleaning and Preprocessing</li>
                  <li>Techniques for Noise Reduction</li>
                  <li>Text Normalization and Tokenization</li>
                  <li>Lemmatization and Stemming</li>
                  <li>Co-occurrence Matrix in Text Analysis</li>
                  <li>Feature Extraction from Text</li>
                  <li>Regular Expressions in Text Processing</li>
                  <li>Basic Overview of Word Embeddings</li>
                  <li>
                    Overview of python libraries such as NLTK, Spacy, regex etc.
                  </li>
                </ul>
              </td>
            </tr>
            <tr className={styles.moduleHeader}>
              <td colSpan={2}>
                Module 2: Fundamentals of Machine Learning for NLP
              </td>
            </tr>
            <tr className={styles.weekRow}>
              <td>Week 3</td>
              <td>
                <b>Lecture 3: Fundamentals of Machine Learning for NLP</b>
                <br />
                <ul>
                  <li>
                    Supervised Learning and Unsupervised Learning - Key
                    Algorithms for NLP
                  </li>
                  <li>Evaluation Metrics for NLP Models</li>
                  <li>
                    Training, Validation, and Test Sets in Model Development
                  </li>
                  <li>Overfitting and Underfitting in NLP</li>
                  <li>Cross-Validation Techniques</li>
                  <li>Introduction to Python ML Libraries</li>
                </ul>
              </td>
            </tr>
            <tr className={styles.weekRow}>
              <td>Week 4</td>
              <td>
                <b>Lecture 4: Neural Networks and Deep Learning in NLP</b>
                <br />
                <ul>
                  <li>Neural Networks and Deep Learning in NLP</li>
                  <li>Activation Functions and Network Topologies</li>
                  <li>Backpropagation and Gradient Descent</li>
                  <li>CNNs and RNNs for NLP</li>
                  <li>Advanced RNNs: LSTM and GRU</li>
                  <li>Sequence Modeling in NLP</li>
                  <li>Challenges in Deep Learning for NLP</li>
                  <li>Case Studies in Deep Learning for NLP</li>
                </ul>
              </td>
            </tr>
            <tr className={styles.weekRow}>
              <td>Week 5</td>
              <td>
                <b>Lecture 5: Transformer Models and Attention Mechanisms</b>
                <br />
                <ul>
                  <li>Transformer Models and Attention Mechanisms</li>
                  <li>Understanding the Transformer Architecture</li>
                  <li>Concepts of Self-Attention and Positional Encoding</li>
                  <li>Overview of BERT, GPT, and Transformer Variants</li>
                  <li>Applications of Transformer Models in NLP</li>
                  <li>Training Transformer Models for NLP Tasks</li>
                  <li>Challenges and Solutions with Transformer Models</li>
                </ul>
              </td>
            </tr>
            <tr className={styles.moduleHeader}>
              <td colSpan={2}>Module 3: NLP Techniques and Applications</td>
            </tr>
            <tr className={styles.weekRow}>
              <td>Week 6</td>
              <td>
                <b>
                  Lecture 6: Syntax, Parsing, Word Embeddings, and POS Tagging
                </b>
                <br />
                <ul>
                  <li>Syntax, Parsing, Word Embeddings, and POS Tagging</li>
                  <li>Syntax in Natural Language Processing</li>
                  <li>Dependency and Constituency Parsing</li>
                  <li>Deep Dive into Word Embeddings</li>
                  <li>Word2Vec, GloVe, and FastText Embeddings</li>
                  <li>Using Embeddings in NLP Tasks</li>
                  <li>
                    Part-of-Speech (POS) Tagging: Importance, Methods, and Tools
                  </li>
                  <li>
                    Practical Parsing, Embedding, and POS Tagging Techniques
                  </li>
                  <li>Vector Database</li>
                </ul>
              </td>
            </tr>
            <tr className={styles.weekRow}>
              <td>Week 7</td>
              <td>
                <b>
                  Lecture 7: Semantic Analysis, Language Models, and Question
                  Answering
                </b>
                <br />
                <ul>
                  <li>
                    Semantic Analysis, Language Models, and Question Answering
                  </li>
                  <li>Semantic Role Labeling (SRL)</li>
                  <li>Knowledge Graphs in Semantic Analysis</li>
                  <li>Advances in Contextual Embeddings</li>
                  <li>Overview of Language Models in NLP</li>
                  <li>
                    Introduction to Question Answering System and Utilizing
                    Language Models
                  </li>
                  <li>Challenges in QA and Semantic Analysis</li>
                  <li>Word Sense Disambiguation Techniques</li>
                </ul>
              </td>
            </tr>
            <tr className={styles.weekRow}>
              <td>Week 8</td>
              <td>
                <b>
                  Lecture 8: Text Classification and Machine Translation +
                  Midterm Exam
                </b>
                <br />
                <ul>
                  <li>MidTerm Exams!!</li>
                  <li>Text Classification and Machine Translation</li>
                  <li>Fundamentals of Text Classification</li>
                  <li>Techniques and Algorithms for Classification</li>
                  <li>Introduction to Machine Translation</li>
                  <li>Neural Machine Translation (NMT) models</li>
                  <li>Challenges and Evaluation Metrics for MT</li>
                  <li>Practical Implementation of MT Systems</li>
                </ul>
              </td>
            </tr>
            <tr className={styles.moduleHeader}>
              <td colSpan={2}>
                Module 4: Specialized Topics and Advanced Techniques in NLP
              </td>
            </tr>
            <tr className={styles.weekRow}>
              <td>Week 9</td>
              <td>
                <b>Lecture 9: Advanced Topics in Machine Learning and NLP</b>
                <br />
                <ul>
                  <li>Advanced Topics in Machine Learning and NLP</li>
                  <li>Deep Transfer Learning in NLP</li>
                  <li>Strategies for Addressing Data Imbalance</li>
                  <li>Model Interpretability and Explainability in NLP</li>
                  <li>Advanced Optimization Techniques in NLP</li>
                  <li>Utilizing Pre-Trained NLP Models</li>
                  <li>Case Studies of Advanced ML in NLP</li>
                </ul>
              </td>
            </tr>
            <tr className={styles.weekRow}>
              <td>Week 10</td>
              <td>
                <b>
                  Lecture 10: Named Entity Recognition, Information Retrieval
                  and Search
                </b>
                <br />
                <ul>
                  <li>
                    Named Entity Recognition, Information Retrieval and Search
                  </li>
                  <li>Advanced Techniques in NER</li>
                  <li>Contextual NER and Its Applications</li>
                  <li>Fundamentals of Information Retrieval</li>
                  <li>Deep Dive into TF-IDF and Co-occurrence Matrix</li>
                  <li>Search Engines and Indexing Techniques</li>
                  <li>Evaluation Metrics in Information Retrieval</li>
                  <li>Case Studies and Real-World Applications</li>
                </ul>
              </td>
            </tr>
            <tr className={styles.weekRow}>
              <td>Week 11</td>
              <td>
                <b>
                  Lecture 11: Advanced Machine Translation and Summarization
                </b>
                <br />
                <ul>
                  <li>Advanced Machine Translation and Summarization</li>
                  <li>Advanced Techniques in Machine Translation</li>
                  <li>Handling Low-Resource Languages in MT</li>
                  <li>Text Summarization</li>
                  <li>Extractive vs. Abstractive Summarization</li>
                  <li>Challenges in Summarization</li>
                  <li>Evaluation of Summarization Techniques</li>
                  <li>Current Trends in MT and Summarization</li>
                </ul>
              </td>
            </tr>
            <tr className={styles.weekRow}>
              <td>Week 12</td>
              <td>
                <b>Lecture 12: Speech Processing and Conversational AI</b>
                <br />
                <ul>
                  <li>Speech Processing and Conversational AI</li>
                  <li>Basics of Speech Recognition</li>
                  <li>Challenges in Automatic Speech Recognition (ASR)</li>
                  <li>Design and Development of Conversational Agents</li>
                  <li>Evaluating Dialogue Systems in Conversational AI</li>
                  <li>Multimodal Interaction in Conversational AI</li>
                  <li>Natural Language Understanding in Conversational AI</li>
                  <li>
                    Case Studies in Speech Processing and Conversational AI
                  </li>
                </ul>
              </td>
            </tr>
            <tr className={styles.moduleHeader}>
              <td colSpan={2}>Module 5: Generative AI</td>
            </tr>
            <tr className={styles.weekRow}>
              <td>Week 13</td>
              <td>
                <b>
                  Lecture 13: Generative AI, Products, Techniques, APIs, and
                  Ethical Considerations
                </b>
                <br />
                <ul>
                  <li>
                    Generative AI, Products, Techniques, APIs, and Ethical
                    Considerations
                  </li>
                  <li>
                    Generative Models in NLP (ChatGPT, BARD, Gemini, Llama)
                  </li>
                  <li>
                    Advanced Prompt Engineering: Few-shot, Chain-of-thought, and
                    Self-Consistency
                  </li>
                  <li>
                    Expanding LLM Capabilities: Knowledge Generation Prompting
                    and Program-aided (PAL)
                  </li>
                  <li>
                    Developing an API with MongoDB and ngrok, and interfacing
                    via Postman
                  </li>
                  <li>
                    LLM Safety: Prompt Injection, Prompt Leaking, Jailbreaking
                  </li>
                  <li>
                    Responsible AI, Data Privacy, Ethical Considerations, and
                    Governance in AI
                  </li>
                  <li>
                    Business Intelligence, Marketing, Analytics, and Brand
                    Analysis Use Cases
                  </li>
                  <li>
                    Introduction to Product Management and Business
                    Considerations
                  </li>
                </ul>
              </td>
            </tr>
            <tr className={styles.weekRow}>
              <td>Week 14</td>
              <td>
                <b>
                  Lecture 14: Training and Fine-Tuning LLMs, Hugging Face,
                  LangChain, and RAG
                </b>
                <br />
                <ul>
                  <li>
                    Training and Fine-Tuning LLMs, Hugging Face, LangChain, and
                    RAG
                  </li>
                  <li>RAG: Retrieval Augmented Generation</li>
                  <li>
                    Training of Chat GPT with Reinforcement Learning, HITL, and
                    Proximal Policy Optimization
                  </li>
                  <li>
                    Evaluation of LLMs: MMLU, HellaSwag Benchmark, ARC,
                    WinoGrade, GSM-8k, Truthful QA, PIQA
                  </li>
                  <li>LoRA and QLoRA for Efficient Model Adaptation</li>
                  <li>Fine Tuning LLMs, Best Practices and Challenges</li>
                  <li>Fine-Tuned LLMs Application</li>
                  <li>
                    Overview and Practical Use of Hugging Face in NLP Based
                    Products
                  </li>
                  <li>
                    Utilizing LangChain and Llama for Customized Language Models
                  </li>
                </ul>
              </td>
            </tr>
            <tr className={styles.weekRow}>
              <td>Week 15</td>
              <td>
                <b>
                  Lecture 15: Course Review, Future Trends, and Project
                  Presentations + Final Exam
                </b>
                <br />
                <ul>
                  <li>
                    Course Review, Future Trends, and Project Presentations +
                    Final Exam
                  </li>
                  <li>Recap of Key NLP and Generative AI Concepts</li>
                  <li>
                    Discussion on the Future Trends in NLP and Generative AI
                  </li>
                  <li>Student Project Presentations</li>
                  <li>Feedback and Review of Projects</li>
                  <li>Resources for Advanced Learning</li>
                  <li>Closing Remarks and Course Evaluation</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { Fall2024 };
