// Add local asset paths here when approved images are available.
export const projects = [
{title:'Chemo Clearly',details:{
  "subtitle": "Personalized chemotherapy education, built as a video generation pipeline.",
  "sections": [
    {
      "heading": "The problem",
      "text": "After speaking with oncologists, I learned that many patients wish they felt more prepared for chemotherapy. Hospitals provide detailed written information, but patients differ in how much detail they want and how they best understand it. A single handout can be difficult to navigate when someone is already facing a stressful diagnosis."
    },
    {
      "heading": "What I’m building",
      "text": "Chemo Clearly is an AI-powered pipeline that turns chemotherapy education material into personalized visual videos. It adapts the level of detail, language complexity, and tone to the patient, with visuals designed to help explain treatment and what to expect."
    },
    {
      "heading": "How it works",
      "items": [
        "Creates a personalized script from education source material and checks it for coverage of important information.",
        "Generates narration and separately checks the speech against the script.",
        "Aligns words with audio to synchronize captions and visuals, then uses an animation pipeline to assemble video scenes.",
        "Tracks and reuses intermediate work so changes to visuals don’t necessarily require regenerating narration."
      ]
    },
    {
      "heading": "My role",
      "text": "I built the project independently, informed by conversations with oncologists and ongoing feedback from an oncologist on the clinical workflow and product direction."
    },
    {
      "heading": "Current stage",
      "text": "A research and development prototype. I’m working toward an R-CHOP chemotherapy education demo and further development before integration into a clinical workflow."
    },
    {
      "heading": "Technologies",
      "text": "Python, PyTorch/TorchAudio, TypeScript, React, Remotion, and generative AI.",
      "link": {
        "label": "View on GitHub ↗",
        "url": "https://github.com/pavanpunnamraju/Chemo_Clearly"
      }
    }
  ]
},video:'assets/chemo-clearly-loop.mp4',poster:'assets/chemo-clearly-poster.jpg',summary:'Building an AI-powered video generation pipeline that creates personalized, clinician-reviewed chemotherapy education videos to help patients understand their treatment and what to expect.',image:null,url:'https://github.com/pavanpunnamraju/Chemo_Clearly',label:'GitHub'},
{title:'PDAC TME Navigator',details:{
  "subtitle": "Mapping the cellular environment around pancreatic tumors to support precision treatment research.",
  "sections": [
    {
      "heading": "The problem",
      "text": "A pancreatic tumor is more than cancer cells alone. It also contains immune, connective tissue, and other cells that can influence how the tumor behaves. Understanding that microenvironment may help researchers investigate more targeted treatment approaches."
    },
    {
      "heading": "What I built",
      "text": "Working with an oncology researcher at Scripps, I built a pipeline that analyzes single-cell RNA sequencing data to map the cells surrounding pancreatic tumors. It generates patient-level research reports combining cell composition, tumor subtype analysis, and cited treatment research."
    },
    {
      "heading": "How it works",
      "items": [
        "Cleans and integrates single-cell data from multiple samples.",
        "Uses a LightGBM model to classify cells into 10 categories and map each sample’s cellular composition.",
        "Scores tumor cells against molecular subtype signatures and generates reports with visualizations, confidence flags, and treatment research considerations."
      ]
    },
    {
      "heading": "Results",
      "text": "Reference-dataset results: The pipeline analyzed 26,804 cells across eight samples. Its cell classifier achieved 98.12% accuracy and a 0.9713 macro-F1 score on a held-out cell-level reference split. These results are not clinical or patient-level validation."
    },
    {
      "heading": "Technologies",
      "text": "Python, Scanpy, AnnData, LightGBM, scikit-learn, Harmony, pandas, NumPy, and Matplotlib.",
      "link": {
        "label": "View on GitHub ↗",
        "url": "https://github.com/pavanpunnamraju/pdac-tme-navigator"
      }
    }
  ]
},video:'assets/tme-navigator-loop.mp4',poster:'assets/tme-navigator-poster.jpg',summary:'Worked with an oncology researcher at Scripps to build a tool that analyzes the cells surrounding pancreatic tumors and pulls real-time research to recommend precision treatment approaches.',image:null,url:'https://github.com/pavanpunnamraju/pdac-tme-navigator',label:'GitHub'},
{title:'PDAC RiskScope',details:{
  "subtitle": "A computational pathology pipeline investigating survival prediction from pancreatic cancer histology.",
  "sections": [
    {
      "heading": "The question",
      "text": "Can features extracted from H&E whole-slide images improve survival prediction beyond pathologic stage alone?"
    },
    {
      "heading": "The approach",
      "paragraphs": [
        "I built a retrospective feasibility pipeline using TCGA-PAAD whole-slide images and clinical data. The pipeline divides tissue slides into patches and uses a frozen Virchow2 foundation model to extract 2,560-dimensional image embeddings.",
        "A gated-attention multiple-instance learning model aggregates patch features into a patient-level representation and predicts discrete-time survival hazards. The study compares image-only predictions with a stage-based Cox model and an image-plus-stage model."
      ]
    },
    {
      "heading": "Evaluation",
      "paragraphs": [
        "The cohort includes 179 patients across 27 submitting sites. The evaluation is designed around five outer and three inner site-grouped folds, helping assess performance across sites rather than randomly mixing their samples.",
        "An audit identified issues in the original evaluation, including risk-score direction and outcome-dependent time binning. The evaluation code has since been corrected and regression-tested; a full corrected run is pending. Historical performance estimates should not be treated as final results."
      ]
    },
    {
      "heading": "Technologies",
      "text": "Python, PyTorch, Virchow2, OpenSlide, timm, scikit-learn, lifelines, NumPy, and pandas.",
      "link": {
        "label": "View on GitHub ↗",
        "url": "https://github.com/pavanpunnamraju/pdac-riskscope"
      }
    }
  ]
},summary:'Rigorously tested an image-analysis approach to predict pancreatic cancer survival from tissue slides, identifying limitations and areas for further research.',image:'assets/riskscope-histology.png',imageAlt:'Illustrative pink and purple histology slide',imageFit:'contain',imageCaption:'Illustrative histology image',url:'https://github.com/pavanpunnamraju/pdac-riskscope',label:'GitHub'},
{title:'Neuramod',details:{
  "title": "Neuramod / NRTR Health",
  "subtitle": "From biomedical research to leading product development for a wearable health platform.",
  "sections": [
    {
      "heading": "The product",
      "text": "NRTR Health brings together information from wearables, apps, labs, and daily health records to help people understand patterns across their health. It also provides personalized, AI-powered guidance and coaching."
    },
    {
      "heading": "My role",
      "text": "I grew from Research Intern to Head of Product Development and Innovation, leading development across mobile, web, backend, and data systems. I coordinated developers and technical contributors and translated research and business priorities into product features."
    },
    {
      "heading": "What I worked on",
      "items": [
        "Led development of a wearable health app used by 100+ people.",
        "Used Dart and SwiftUI to build features for an agentic AI pipeline that recommends personalized schedules based on nutrition, sleep, and exercise patterns.",
        "Contributed to on-device AI and data-privacy features.",
        "Built a Python-based Health Status Metric incorporating insulin sensitivity, beta-cell function, and metabolic biomarkers.",
        "Developed automated literature-mining workflows using APIs, OpenAI models, and n8n.",
        "Structured insights from more than 1,000 biomedical papers, mapping 273 biomarkers into a dataset with over 15,000 biomarker relationship entries."
      ]
    },
    {
      "heading": "Technologies",
      "text": "Dart, SwiftUI, Python, REST APIs, OpenAI models, n8n, and wearable health-data integrations.",
      "link": {
        "label": "Visit NRTR Health ↗",
        "url": "https://nrtr.health/index.html"
      }
    }
  ]
},summary:'Grew from research intern to Head of Product Development and Innovation, leading the development of a wearable health app used by 100+ people.',image:'assets/neuramod-preview.png',imageAlt:'NRTR health interface showing lifestyle factors and estimated lab impact',imageFit:'contain',url:'https://nrtr.health/index.html',label:'Website'}
];
export const memories = [
{caption:'Captain Po 🐼',asset:'assets/captain-po.webp',width:2560,height:3200,alt:'Pavan on stage as Po during his second-year season'},
{caption:'A season to remember',asset:'assets/dance-trophies.jpg',width:1365,height:2048,alt:'Pavan seated beside dance trophies'},
{caption:'High school nationals',asset:'assets/basketball-nationals.jpg',width:1440,height:1800,alt:'Pavan holding a basketball on court at high-school nationals'},
{caption:'Exploring San Diego',asset:'assets/exploring-san-diego.jpg',width:1536,height:2048,alt:'Sunset over the ocean and rocky San Diego shoreline'}
];
export const danceVideo = 'assets/dance.mp4';
