import React from "react";
import styles from "./Spring2024.module.css";

const Spring2024: React.FC = () => {
  return (
    <div className={styles.spring2024Body}>
      <div className={styles.contentWrapper}>
        <div className={styles.imageRepeatTop}></div>
        <h1 className={styles.spring2024Title}>
          TAC-459 Generative AI and Applied Machine Learning for Natural
          Language Processing (NLP)
        </h1>
        <h2 className={styles.spring2024Subtitle}>
          University of Southern California (USC), Viterbi School of Engineering
        </h2>
        <p className={styles.spring2024Text}>
          <strong>Units:</strong> 4, <strong>Term:</strong> Spring 2024,{" "}
          <strong>Prerequisite(s):</strong> TAC 359
          <br />
          <strong>Time:</strong> Mon 6-9:20PM, <strong>Location:</strong> KAP
          144
        </p>
        <h2>Instructor Information</h2>
        <h3>
          <strong>Instructor:</strong>{" "}
          <a
            href="https://www.linkedin.com/in/allenbolourchi/"
            className={styles.spring2024Link}
          >
            Allen Bolourchi
          </a>
        </h3>
        <p className={styles.spring2024Text}>
          <strong>Adjunct Professor of Generative AI and NLP at USC</strong>
          <br />
          <strong>
            Founder of{" "}
            <a
              href="https://www.crystalytic.ai/"
              className={styles.spring2024Link}
            >
              Crystalytic.AI
            </a>
          </strong>
        </p>
        <img
          src="https://static.wixstatic.com/media/1ea898_97bf6eb77cfc4cf183cb64ff74cc81c8~mv2.jpg/v1/fill/w_439,h_498,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/1ea898_97bf6eb77cfc4cf183cb64ff74cc81c8~mv2.jpg"
          alt="Instructor Image"
          className={styles.instructorImage}
        />
        <br />
        <br />
        <strong>Office Hours:</strong> Tuesdays 6 PM-8 PM by appointment only.
        <h2>Course Assistants</h2>
        <a
          href="https://www.linkedin.com/in/rajeevsinghusc/"
          className={styles.spring2024Link}
        >
          Rajeev Singh
        </a>
        <br />
        <img
          src="/archive/people/Rajeev_Dharmendra_Singh.jpg"
          alt="Course Assistant"
          className={styles.courseAssistantImage}
        />
        <br />
        <br />
        <a
          href="https://www.linkedin.com/in/gauravreddy08/"
          className={styles.spring2024Link}
        >
          Gaurav Tadkapally
        </a>
        <br />
        <img
          src="/archive/people/gaurav.jpeg"
          alt="Course Assistant"
          className={styles.courseAssistantImage}
        />
        <br />
        <br />
        <h2>Course Description</h2>
        <p className={styles.spring2024Text}>
          Learn the state-of-the-art technology in Artificial Intelligence,
          including the latest AI tools and algorithms in Natural Language
          Processing (NLP), Generative AI, and models such as GPT/BERT, along
          with Tensorflow, Keras and Hugging Face. <br />
          <br />
          You will explore the fundamentals of NLP and discover which
          technologies and products have been developed using NLP and Generative
          AI for text. The course covers how to utilize pre-trained Large
          Language Models (LLMs) and their APIs, fine-tune LLMs, and retrain
          LLMs.
          <br />
        </p>
        <h2>Course Schedule: A Weekly Breakdown</h2>
        <table className={styles.responsiveTable}>
          <tr>
            <th>Weekly Topics and Details</th>
            <th>Weekly Topics and Details</th>
          </tr>
          <tr>
            <td>
              <strong>Week 1: Introduction to NLP and AI</strong>
              <ul>
                <li>Course Overview</li>
                <li>Historical Evolution of AI and NLP</li>
                <li>Key Concepts in Machine Learning and NLP</li>
                <li>Overview of NLP Applications in Various Domains</li>
                <li>Basic Text Processing and Language Understanding</li>
                <li>Challenges and Limitations in NLP</li>
              </ul>
            </td>
            <td>
              <strong>
                Week 9: Advanced Topics in Machine Learning and NLP
              </strong>
              <ul>
                <li>Deep Transfer Learning in NLP</li>
                <li>Strategies for Addressing Data Imbalance</li>
                <li>Model Interpretability and Explainability in NLP</li>
                <li>Advanced Optimization Techniques in NLP</li>
                <li>Utilizing Pre-Trained NLP Models</li>
                <li>Case Studies of Advanced ML in NLP</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Week 2: Text Cleaning and Preprocessing</strong>
              <ul>
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
            <td>
              <strong>
                Week 10: Named Entity Recognition, Information Retrieval and
                Search
              </strong>
              <ul>
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
          <tr>
            <td>
              <strong>Week 3: Fundamentals of Machine Learning for NLP</strong>
              <ul>
                <li>
                  Supervised Learning and Unsupervised Learning - Key Algorithms
                  for NLP
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
            <td>
              <strong>
                Week 11: Advanced Machine Translation and Summarization
              </strong>
              <ul>
                <li>Advanced Techniques in Machine Translation</li>
                <li>
                  Handling Low-Resource Languages in (Machine Translation) MT
                </li>
                <li>Text Summarization</li>
                <li>Extractive vs. Abstractive Summarization</li>
                <li>Challenges in Summarization</li>
                <li>Evaluation of Summarization Techniques</li>
                <li>Current Trends in MT and Summarization</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Week 4: Neural Networks and Deep Learning in NLP</strong>
              <ul>
                <li>Activation Functions and Network Topologies</li>
                <li>Backpropagation and Gradient Descent</li>
                <li>CNNs and RNNs for NLP</li>
                <li>Advanced RNNs: LSTM and GRU</li>
                <li>Sequence Modeling in NLP</li>
                <li>Challenges in Deep Learning for NLP</li>
                <li>Case Studies in Deep Learning for NLP</li>
              </ul>
            </td>
            <td>
              <strong>Week 12: Speech Processing and Conversational AI</strong>
              <ul>
                <li>Basics of Speech Recognition</li>
                <li>Challenges in Automatic Speech Recognition (ASR)</li>
                <li>Design and Development of Conversational Agents</li>
                <li>Evaluating Dialogue Systems in Conversational AI</li>
                <li>Multimodal Interaction in Conversational AI</li>
                <li>Natural Language Understanding in Conversational AI</li>
                <li>Case Studies in Speech Processing and Conversational AI</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <strong>
                Week 5: Transformer Models and Attention Mechanisms
              </strong>
              <ul>
                <li>Understanding the Transformer Architecture</li>
                <li>Concepts of Self-Attention and Positional Encoding</li>
                <li>Overview of BERT, GPT, and Transformer Variants</li>
                <li>Applications of Transformer Models in NLP</li>
                <li>Training Transformer Models for NLP Tasks</li>
                <li>Challenges and Solutions with Transformer Models</li>
              </ul>
            </td>
            <td>
              <strong>
                Week 13: Generative AI, Products, Techniques, APIs, and Ethical
                Considerations
              </strong>
              <ul>
                <li>Generative Models in NLP (ChatGPT, BARD, Gemini, Llama)</li>
                <li>
                  Advanced Prompt Engineering: Few-shot, Chain-of-thought, and
                  Self-Consistency
                </li>
                <li>
                  Expanding LLM Capabilities: Knowledge Generation Prompting and
                  Program-aided (PAL)
                </li>
                <li>
                  Developing an API with MongoDB and ngrok, and interfacing via
                  Postman
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
                  Introduction to Product Management and Business Considerations
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <strong>
                Week 6: Syntax, Parsing, Word Embeddings, and POS Tagging
              </strong>
              <ul>
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
            <td>
              <strong>
                Week 14: Training and Fine-Tuning LLMs, Hugging Face, LangChain,
                and RAG
              </strong>
              <ul>
                <li>RAG: Retrieval Augmented Generation</li>
                <li>
                  Training of Chat GPT with Reinforcement Learning, HITL, and
                  Proximal Policy Optimization
                </li>
                <li>
                  Evaluation of LLMs: MMLU, HellaSwag Benchmark, ARC, WinoGrade,
                  GSM-8k, Truthful QA, PIQA
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
          <tr>
            <td>
              <strong>
                Week 7: Semantic Analysis, Language Models, and Question
                Answering
              </strong>
              <ul>
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
            <td>
              <strong>
                Week 15: Course Review, Future Trends, and Project Presentations
                + Final Exam
              </strong>
              <ul>
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
          <tr>
            <td>
              <strong>
                Week 8: Text Classification and Machine Translation + Midterm
                Exam
              </strong>
              <ul>
                <li>Fundamentals of Text Classification</li>
                <li>Techniques and Algorithms for Classification</li>
                <li>Introduction to Machine Translation</li>
                <li>Neural Machine Translation (NMT) models</li>
                <li>Challenges and Evaluation Metrics for MT</li>
                <li>Practical Implementation of MT Systems</li>
              </ul>
            </td>
            <td></td>
          </tr>
        </table>
        <h2>Technological Proficiency</h2>
        <p>
          Familiarity with Google Colab and Python is necessary. If you haven't
          used them, familiarize yourself with Google Colab and set it up. We
          will teach you the rest of the python packages in the classroom.
          <br />
          <a
            href="https://colab.research.google.com/"
            className={styles.spring2024Link}
          >
            Google Colab
          </a>
        </p>
      </div>
    </div>
  );
};

export { Spring2024 };
