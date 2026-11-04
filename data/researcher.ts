export type RecordStatus = "source_listed" | "review_needed";

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  cited_by: number | null;
  year: number | null;
  source_url: string;
  record_status: RecordStatus;
}

export const profile = {
  name: "Narayan C Paul",
  credentials: ["DVM", "PhD", "Diplomate ACVM"],
  title: "Director & Professor",
  institution: "Breathitt Veterinary Center, Murray State University, KY",
  verified_email_domain: "tvmdl.tamu.edu",
  homepage: "https://tvmdl.tamu.edu/",
  google_scholar_url:
    "https://scholar.google.com/citations?user=tmu5oMMAAAAJ&hl=en",
  research_interests: [
    "Clinical Microbiology",
    "Antibiotic Resistance",
    "Bioinformatics",
    "Diagnostic Test Development",
  ],
} as const;

export const sourceMetadata = {
  source_file: "Pasted markdown(2).md",
  records_parsed: 47,
  note:
    "Records are preserved from the supplied Google Scholar markdown export. Records flagged as review_needed must be manually verified before being presented as confirmed publications.",
} as const;

export const publications: Publication[] = [
  {
    id: "p01",
    title:
      "Carriage of Methicillin‐Resistant *Staphylococcus pseudintermedius* in Small Animal Veterinarians: Indirect Evidence of Zoonotic Transmission",
    authors: "NC Paul, A Moodley, G Ghibaudo, L Guardabassi",
    venue: "Zoonoses and public health 58 (8), 533-539",
    cited_by: 258,
    year: 2011,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&citation_for_view=tmu5oMMAAAAJ:J-pR_7NvFogC",
    record_status: "source_listed",
  },
  {
    id: "p02",
    title:
      "Population dynamics and antimicrobial resistance of the most prevalent poultry-associated Salmonella serotypes",
    authors: "DH Shah, NC Paul, WC Sischo, R Crespo, J Guard",
    venue: "Poultry Science",
    cited_by: 235,
    year: 2016,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&citation_for_view=tmu5oMMAAAAJ:eq2jaN3J8jMC",
    record_status: "source_listed",
  },
  {
    id: "p03",
    title:
      "Staphylococcus pseudintermedius colonization patterns and strain diversity in healthy dogs: a cross-sectional and longitudinal study",
    authors: "NC Paul, SC Bärgman, A Moodley, SS Nielsen, L Guardabassi",
    venue: "Veterinary microbiology 160 (3-4), 420-427",
    cited_by: 103,
    year: 2012,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&citation_for_view=tmu5oMMAAAAJ:wbdj-CoPYUoC",
    record_status: "source_listed",
  },
  {
    id: "p04",
    title:
      "Biofilm forming *Salmonella* strains exhibit enhanced thermal resistance in wheat flour",
    authors: "R Villa-Rojas, MJ Zhu, NC Paul, P Gray, J Xu, DH Shah, J Tang",
    venue: "Food Control 73, 689-695",
    cited_by: 79,
    year: 2017,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&citation_for_view=tmu5oMMAAAAJ:WqliGbK-hY8C",
    record_status: "source_listed",
  },
  {
    id: "p05",
    title:
      "The Salmonella pathogenicity island 13 contributes to pathogenesis in streptomycin pre-treated mice but not in day-old chickens.",
    authors: "JR Elder, KL Chiok, NC Paul, G Haldorson, J Guard, DH Shah",
    venue: "Gut Pathogens 8 (16)",
    cited_by: 46,
    year: 2016,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&citation_for_view=tmu5oMMAAAAJ:dTyEYWd-f8wC",
    record_status: "source_listed",
  },
  {
    id: "p06",
    title:
      "Biosolids and Tillage Practices Influence Soil Bacterial Communities in Dryland Wheat: Schlatter DC et al.",
    authors:
      "DC Schlatter, NC Paul, DH Shah, WF Schillinger, AI Bary, B Sharratt, ...",
    venue: "Microbial Ecology 78 (3), 737-752",
    cited_by: 45,
    year: 2019,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&citation_for_view=tmu5oMMAAAAJ:W5xh706n7nkC",
    record_status: "source_listed",
  },
  {
    id: "p07",
    title:
      "Chapter 10. Genetic Basis of Salmonella Enteritidis Pathogenesis in Chickens",
    authors: "DH Shah, JR Elder, KL Chiok, NC Paul",
    venue: "Producing Safe Eggs: Microbial Ecology of Salmonella 1",
    cited_by: 44,
    year: 2016,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&citation_for_view=tmu5oMMAAAAJ:ye4kPcJQO24C",
    record_status: "source_listed",
  },
  {
    id: "p08",
    title:
      "Genetically distinct lineages of Salmonella Typhimurium ST313 and ST19 are present in Brazil",
    authors:
      "PHN Panzenhagen, NC Paul, CAC Junior, RG Costa, DP Rodrigues, ...",
    venue: "International Journal of Medical Microbiology 308 (2), 306-316",
    cited_by: 39,
    year: 2018,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&citation_for_view=tmu5oMMAAAAJ:1yQoGdGgb4wC",
    record_status: "source_listed",
  },
  {
    id: "p09",
    title:
      "Antimicrobial Susceptibility of Methicillin-Resistant *Staphylococcus Pseudintermedius* isolated from Veterinary Clinical Cases in the UK",
    authors: "RR Maluping, NC Paul, A Moodley",
    venue: "British Journal of Biomedical Science 71 (2), 55-57",
    cited_by: 39,
    year: 2014,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&citation_for_view=tmu5oMMAAAAJ:WA5NYHcadZ8C",
    record_status: "source_listed",
  },
  {
    id: "p10",
    title:
      "The occurrence of *Salmonella*, extended‐spectrum β‐lactamase producing *Escherichia coli* and carbapenem resistant non‐fermenting Gram‐negative bacteria in …",
    authors: "DH Shah, MM Board, R Crespo, J Guard, NC Paul, C Faux",
    venue: "Zoonoses and public health 67 (6), 742-753",
    cited_by: 33,
    year: 2020,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&citation_for_view=tmu5oMMAAAAJ:Fu2w8maKXqMC",
    record_status: "source_listed",
  },
  {
    id: "p11",
    title:
      "Evaluation of passive immunotherapeutic efficacy of hyperimmunized egg yolk powder against intestinal colonization of Campylobacter jejuni in chickens",
    authors: "NC Paul, S Al-Adwani, R Crespo, DH Shah",
    venue: "Poultry science 93 (11), 2779-2787",
    cited_by: 33,
    year: 2014,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&citation_for_view=tmu5oMMAAAAJ:HE397vMXCloC",
    record_status: "source_listed",
  },
  {
    id: "p12",
    title:
      "Genomic organization and role of SPI-13 in nutritional fitness of Salmonella",
    authors: "JR Elder, NC Paul, R Burin, J Guard, DH Shah",
    venue: "International Journal of Medical Microbiology",
    cited_by: 31,
    year: 2018,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&citation_for_view=tmu5oMMAAAAJ:JQOojiI6XY0C",
    record_status: "source_listed",
  },
  {
    id: "p13",
    title:
      "Differences in antimicrobial activity of chlorine against twelve most prevalent poultry-associated Salmonella serotypes",
    authors: "NC Paul, TS Sullivan, DH Shah",
    venue: "Food Microbiology 64, 202-209",
    cited_by: 31,
    year: 2017,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&citation_for_view=tmu5oMMAAAAJ:LjlpjdlvIbIC",
    record_status: "source_listed",
  },
  {
    id: "p14",
    title:
      "Investigation of SARS-CoV-2 infection and associated lesions in exotic and companion animals",
    authors:
      "DS Rotstein, S Peloquin, K Proia, E Hart, J Lee, KK Vyhnal, E Sasaki, ...",
    venue: "Veterinary pathology 59 (4), 707-711",
    cited_by: 22,
    year: 2022,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&citation_for_view=tmu5oMMAAAAJ:2KloaMYe4IUC",
    record_status: "source_listed",
  },
  {
    id: "p15",
    title:
      "Dam‐to‐offspring transmission and persistence of *Staphylococcus pseudintermedius* clones within dog families",
    authors: "NC Paul, P Damborg, L Guardabassi",
    venue: "Veterinary dermatology 25 (1), 3-e2",
    cited_by: 22,
    year: 2014,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&citation_for_view=tmu5oMMAAAAJ:5ugPr518TE4C",
    record_status: "source_listed",
  },
  {
    id: "p16",
    title:
      "A survey of current activities and technologies used to detect carbapenem resistance in bacteria isolated from companion animals at veterinary diagnostic laboratories—United …",
    authors:
      "MA Waltenburg, A Shugart, JD Loy, D Tewari, S Zhang, SD Cole, ...",
    venue: "Journal of Clinical Microbiology 60 (3), e02154-21",
    cited_by: 18,
    year: 2022,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&citation_for_view=tmu5oMMAAAAJ:evX43VCCuoAC",
    record_status: "source_listed",
  },
  {
    id: "p17",
    title:
      "Alterations to the bovine bacterial ocular surface microbiome in the context of infectious bovine keratoconjunctivitis",
    authors:
      "HB Gafen, CC Liu, NE Ineck, CM Scully, MA Mironovich, CM Taylor, ...",
    venue: "Animal Microbiome 5 (1), 60",
    cited_by: 16,
    year: 2023,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&citation_for_view=tmu5oMMAAAAJ:VLnqNzywnoUC",
    record_status: "source_listed",
  },
  {
    id: "p18",
    title:
      "Dimethyl adenosine transferase (KsgA) contributes to cell-envelope fitness in Salmonella Enteritidis",
    authors: "KL Chiok, NC Paul, EO Adekanmbi, SK Srivastava, DH Shah",
    venue: "Microbiological research 216, 108-119",
    cited_by: 16,
    year: 2018,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&citation_for_view=tmu5oMMAAAAJ:uLbwQdceFCQC",
    record_status: "source_listed",
  },
  {
    id: "p19",
    title:
      "Complete Genome Sequence of a Ciprofloxacin Resistant Salmonella enterica subsp. enterica serovar Kentucky ST198 Strain PU131 Isolated From a Human Patient in WA State",
    authors: "DH Shah, NC Paul, J Guard",
    venue: "Genome Announcements",
    cited_by: 15,
    year: 2018,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&citation_for_view=tmu5oMMAAAAJ:PR6Y55bgFSsC",
    record_status: "source_listed",
  },
  {
    id: "p20",
    title:
      "In vitro adherence of *Staphylococcus pseudintermedius* to canine corneocytes is influenced by colonization status of corneocyte donors",
    authors:
      "NC Paul, F Latronico, A Moodley, SS Nielsen, P Damborg, L Guardabassi",
    venue: "Veterinary research 44 (1), 52",
    cited_by: 12,
    year: 2013,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&citation_for_view=tmu5oMMAAAAJ:bnK-pcrLprsC",
    record_status: "source_listed",
  },
  {
    id: "p21",
    title:
      "Development of a novel real-time PCR multiplex assay for detection of Streptococcus equi subspecies equi and Streptococcus equi subspecies zooepidemicus",
    authors:
      "ERA Morris, ME Schroeder, PJ Ferro, AS Waller, AA McGlennon, ...",
    venue: "Veterinary Microbiology 284, 109797",
    cited_by: 11,
    year: 2023,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:fEOibwPWpKIC",
    record_status: "source_listed",
  },
  {
    id: "p22",
    title: "Water sorption characteristics of freeze-dried bacteria in low-moisture foods",
    authors: "J Xu, Y Xie, NC Paul, MS Roopesh, DH Shah, J Tang",
    venue: "International journal of food microbiology 362, 109494",
    cited_by: 11,
    year: 2022,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:_Re3VWB3Y0AC",
    record_status: "source_listed",
  },
  {
    id: "p23",
    title: "*Yokenella regensburgei*, a novel pathogen in farmed American alligators",
    authors: "G Balamayooran, C Cooper, NC Paul, PJ Ferro, L Rice, G Gomez, ...",
    venue: "Veterinary pathology 59 (3), 476-481",
    cited_by: 9,
    year: 2022,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:tzM49s52ZIMC",
    record_status: "source_listed",
  },
  {
    id: "p24",
    title:
      "Collaboration with the clinical microbiology laboratory optimizes diagnosis of dog and cat infections: recommendations from the American College of Veterinary Microbiologists",
    authors:
      "SD Cole, NC Paul, K Hendrix, SD Lawhon, SC Rankin, D Diaz-Campos, ...",
    venue:
      "Journal of the American Veterinary Medical Association 263 (S1), S88-S97",
    cited_by: 8,
    year: 2025,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:0KyAp5RtaNEC",
    record_status: "source_listed",
  },
  {
    id: "p25",
    title: "Editorial:: MRSP: prevalence in practice",
    authors: "NC Paul",
    venue: "Veterinary Record 176, 170-171",
    cited_by: 8,
    year: 2015,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:Y5dfb0dijaUC",
    record_status: "source_listed",
  },
  {
    id: "p26",
    title:
      "Persistence of Maternally-Derived Antibody in Selected Group of Chicks to Fowl Pox Virus",
    authors: "AHM Akhter, M Khan, NC Paul, A Kafi, NK Shil, MP Siddique",
    venue: "Bangladesh Journal of Microbiology 25 (1), 57-59",
    cited_by: 8,
    year: 2010,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:d1gkVwhDpl0C",
    record_status: "source_listed",
  },
  {
    id: "p27",
    title:
      "Assessing the urinary concentration of nitrofurantoin and its antibacterial activity against Escherichia coli, Staphylococcus pseudintermedius, and Enterococcus faecium …",
    authors:
      "CC Hung, C Varga, JM Reinhart, CW Maddox, RN Dilger, L Forsythe, ...",
    venue: "Frontiers in Veterinary Science 10, 1189374",
    cited_by: 7,
    year: 2023,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:j8SEvjWlNXcC",
    record_status: "source_listed",
  },
  {
    id: "p28",
    title:
      "Maternally-Derived Antibody and Seroconversion to Infectious Bronchitis Virus in Chicken",
    authors: "NC Paul, M Khan, S Islam, AHM Akhter, NK Shil",
    venue: "Bangladesh Journal of Microbiology 25 (1), 53-56",
    cited_by: 4,
    year: 2010,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:u-x6o8ySG0sC",
    record_status: "source_listed",
  },
  {
    id: "p29",
    title:
      "Draft Genome Sequences of 11 Salmonella enterica Serovar Typhimurium Strains Isolated from Human Systemic and Nonsystemic Sites in Brazil",
    authors:
      "PHN Panzenhagen, NC Paul, CAC Junior, RG Costa, DP Rodrigues, ...",
    venue: "Genome announcements 6 (5), e01223-17",
    cited_by: 2,
    year: 2018,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:ZuybSZzF8UAC",
    record_status: "source_listed",
  },
  {
    id: "p30",
    title: "Lack of MRSP detection in healthy dogs attending a Danish referral hospital",
    authors: "NC Paul, SC Bärgman, A Moodley",
    venue: "Poster Abstract 44",
    cited_by: 2,
    year: 2011,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:tkaPQYYpVKoC",
    record_status: "source_listed",
  },
  {
    id: "p31",
    title: "Transtracheal Wash Fluid Collection and Analysis in Healthy Goats",
    authors: "BJ Savitske, RJ Dulli, NC Paul, KE Washburn",
    venue: "Journal of Veterinary Internal Medicine 39 (5), jvim70211",
    cited_by: 1,
    year: 2025,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:ipzZ9siozwsC",
    record_status: "source_listed",
  },
  {
    id: "p32",
    title:
      "Comparative genomics identifies methicillin resistant Staphylococcus pseudintermedius ST71 as highly clonal across different geographical locations, irrespective of isolation …",
    authors: "NC Paul, LP Jones, MA Davis, V Perreten, JS Weese, JB Daniels, ...",
    venue: "American Association of Veterinary Laboratory Diagnosticians",
    cited_by: 1,
    year: 2019,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:35r97b3x0nAC",
    record_status: "source_listed",
  },
  {
    id: "p33",
    title:
      "Draft Genome Sequences of 12 Clinical and Environmental Methicillin-Resistant Staphylococcus pseudintermedius Strains Isolated from a Veterinary Teaching Hospital in Washington …",
    authors: "DH Shah, LP Jones, N Paul, MA Davis",
    venue: "Genome Announcements 6 (15), 10.1128/genomea. 00290-18",
    cited_by: 1,
    year: 2018,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:dQ2og3OwTAUC",
    record_status: "source_listed",
  },
  {
    id: "p34",
    title:
      "Evaluation of acoustic pulse and cold laser therapies for the treatment of dairy cows with subclinical mastitis under organic management conditions",
    authors: "B Shrestha, BW Jones, JM Piñeiro, JA Spencer, J Velez, NC Paul, ...",
    venue: "Frontiers in Veterinary Science 13, 1856042",
    cited_by: null,
    year: 2026,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:URolC5Kub84C",
    record_status: "source_listed",
  },
  {
    id: "p35",
    title:
      "Determinants of Rabies Post-Exposure Prophylaxis Compliance in Bangladesh: Informing Policy for Elimination by 2030",
    authors: "S Ghosh, MN Hasan, S Chowdhury, NC Paul, W Ahmad, J Chen, TS Sunil",
    venue: "Tropical Medicine and Infectious Disease 11 (6), 165",
    cited_by: null,
    year: 2026,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:uWiczbcajpAC",
    record_status: "source_listed",
  },
  {
    id: "p36",
    title:
      "A New Real-Time PCR Multiplex Assay for Simultaneously Detecting Streptococcus",
    authors: "ER Morris, ME Schroeder, PJ Ferro, AS Waller, AA McGlennon, ...",
    venue:
      "69 th Annual Convention of the American Association of Equine Practitioners, 171",
    cited_by: null,
    year: 2023,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:epqYDVWIO7EC",
    record_status: "source_listed",
  },
  {
    id: "p37",
    title:
      "A new real-time PCR multiplex assay for simultaneously detecting *Streptococcus equi* subspecies *equi* and *Streptococcus equi* subspecies *zooepidemicus*.",
    authors: "ER Morris, ME Schroeder, PJ Ferro, AS Waller, AA McGlennon, ...",
    venue: "",
    cited_by: 2023,
    year: null,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:zLWjf1WUPmwC",
    record_status: "source_listed",
  },
  {
    id: "p38",
    title:
      "The ongoing outbreak of SARS-CoV-2 virus infections in humans in Bangladesh: a public health emergency",
    authors: "S Chowdhury",
    venue: "Authorea 2020 (0504)",
    cited_by: null,
    year: 2020,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:7T2F9Uy0os0C",
    record_status: "source_listed",
  },
  {
    id: "p39",
    title: "Genetic Salmonella Pathogenesis Basis Enteritidis in of Chickens",
    authors: "DH Shah, JR Elder, KL Chiok, NC Paul",
    venue: "Producing Safe Eggs: Microbial Ecology of Salmonella, 187",
    cited_by: null,
    year: 2016,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:nrtMV_XWKgEC",
    record_status: "source_listed",
  },
  {
    id: "p40",
    title:
      "Biofilm Formation and Antimicrobial Resistance among Most Prevalent Poultry-Associated Salmonella Serotypes (MPPSTs) Isolated from the US Poultry and Poultry Products",
    authors: "DH Shah, NC Paul, R Crespo",
    venue: "2015 Annual Meeting (July 25-28, 2015)",
    cited_by: null,
    year: 2015,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:_B80troHkn4C",
    record_status: "source_listed",
  },
  {
    id: "p41",
    title:
      "Influence of Biofilm Formation in the Resistance of Salmonella to Desiccation and Thermal Treatment in Wheat Flour",
    authors: "R Villa-Rojas, J Tang, MJ Zhu, DH Shah, NC Paul, J Xu",
    venue: "2015 Annual Meeting (July 25-28, 2015)",
    cited_by: null,
    year: 2015,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:PELIpwtuRlgC",
    record_status: "source_listed",
  },
  {
    id: "p42",
    title:
      "Staphylococcus Pseudintermedius Colonization and Transmission in Healthy Dogs: PhD Thesis",
    authors: "NC Paul",
    venue: "Faculty of Health and Medical Sciences, University of Copenhagen",
    cited_by: null,
    year: 2013,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:AXPGKjj_ei8C",
    record_status: "source_listed",
  },
  {
    id: "p43",
    title:
      "Genetic diversity of Staphylococcus pseudintermedius isolated from healty dogs in Copenhagen, Denmark",
    authors: "F Latronico, SC Bärgman, NC Paul, A Moodley, L Guardabassi",
    venue: "ASM-ESCMID Conference on Methicillin-resistant Staphylococci in Animals",
    cited_by: null,
    year: 2011,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:Tyk-4Ss8FVUC",
    record_status: "source_listed",
  },
  {
    id: "p44",
    title:
      "Comparative Study on Production of Antibody in Broilers Vaccinated with Four Lyophilized Newcastle Disease Vaccine",
    authors: "S Kamrunnahar, A MM, AHM Taslima, MA Islam, NC Paul",
    venue: "Bangladesh J 27 (1)",
    cited_by: null,
    year: 2010,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:9yKSN-GCB0IC",
    record_status: "source_listed",
  },
  {
    id: "p45",
    title:
      "The Official Journal of the: European Society of Veterinary Dermatology American College of Veterinary Dermatology",
    authors: "D MORRIS, A LOEFFLER, T GRÖNTHAL, H JACKSON, E LAYNE, ...",
    venue: "",
    cited_by: null,
    year: null,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:EkHepimYqZsC",
    record_status: "review_needed",
  },
  {
    id: "p46",
    title: "DANIEL MORRIS",
    authors:
      "A LOEFFLER, MC CADIERGUES, H JACKSON, E LAYNE, E MAULDIN, ...",
    venue: "",
    cited_by: null,
    year: null,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:uc_IGeMz5qoC",
    record_status: "review_needed",
  },
  {
    id: "p47",
    title: "ANETTE LOEFFLER",
    authors: "DAN MORRIS, L FERRER, H JACKSON, E LAYNE, E MAULDIN, ...",
    venue: "",
    cited_by: null,
    year: null,
    source_url:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tmu5oMMAAAAJ&cstart=20&pagesize=80&citation_for_view=tmu5oMMAAAAJ:yB1At4FlUx8C",
    record_status: "review_needed",
  },
];