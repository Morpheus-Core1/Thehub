/**
 * The Hub — NISR Data Layer Service
 * 
 * Manages normalized indicators from the National Institute of Statistics of Rwanda (NISR).
 * Preserves strict data provenance: source, dataset, indicator, year, unit, geography, metadata.
 */

export const officialNisrIndicators = [
  {
    id: 'nisr-srv-01',
    source: 'National Institute of Statistics of Rwanda (NISR)',
    dataset: 'Labour Force Survey (LFS) Annual Report',
    indicator: 'Employment Share: Services Sector',
    indicator_code: 'NISR-LFS-EMP-SRV',
    year: 2023,
    period: 'Annual',
    geography: 'Rwanda - National',
    unit: '% of total employed',
    value: 38.6,
    metadata: {
      definition: 'Percentage of the employed population engaged in tertiary/service activities including ICT, trade, finance, hospitality, and education.',
      methodology_url: 'https://www.statistics.gov.rw/datasource/labour-force-survey',
      relevance_note: 'Guides skill investments in digital technologies, communication, customer relations, and business management.'
    },
    retrieved_at: '2026-09-29T08:00:00Z'
  },
  {
    id: 'nisr-youth-02',
    source: 'National Institute of Statistics of Rwanda (NISR)',
    dataset: 'Labour Force Survey (LFS) Annual Report',
    indicator: 'Youth Labour Force Participation Rate',
    indicator_code: 'NISR-LFS-YOUTH-LFPR',
    year: 2023,
    period: 'Annual',
    geography: 'Rwanda - National',
    unit: '%',
    value: 52.4,
    metadata: {
      definition: 'Proportion of the youth population (aged 16-30) that is active in the labour market (employed or seeking work).',
      methodology_url: 'https://www.statistics.gov.rw/datasource/labour-force-survey',
      relevance_note: 'Underscores the need for verifiable evidence of skills (Skill Passport) to facilitate youth career entry.'
    },
    retrieved_at: '2026-09-29T08:00:00Z'
  },
  {
    id: 'nisr-ict-03',
    source: 'National Institute of Statistics of Rwanda (NISR)',
    dataset: 'Statistical Yearbook & RURA Digital Reports',
    indicator: 'Broadband & Mobile Internet Access Rate',
    indicator_code: 'NISR-ICT-ACCESS',
    year: 2023,
    period: 'Annual',
    geography: 'Rwanda - National',
    unit: '% individuals accessing broadband',
    value: 34.2,
    metadata: {
      definition: 'Estimated percentage of individuals with regular mobile broadband or household connectivity.',
      methodology_url: 'https://www.statistics.gov.rw/statistical-publications/subjects/ict',
      relevance_note: 'Directly informs The Hub low-bandwidth, mobile-optimized, and self-paced content architecture.'
    },
    retrieved_at: '2026-09-29T08:00:00Z'
  },
  {
    id: 'nisr-agri-04',
    source: 'National Institute of Statistics of Rwanda (NISR)',
    dataset: 'Labour Force Survey (LFS) Annual Report',
    indicator: 'Employment Share: Agriculture Sector',
    indicator_code: 'NISR-LFS-AGRI-SHARE',
    year: 2023,
    period: 'Annual',
    geography: 'Rwanda - National',
    unit: '% of total employed',
    value: 44.8,
    metadata: {
      definition: 'Share of total employed population working in farming, livestock, forestry, and modern agribusiness value chains.',
      methodology_url: 'https://www.statistics.gov.rw/datasource/labour-force-survey',
      relevance_note: 'Highlights the strategic importance of Agribusiness Fundamentals and Digital Tools for Agriculture.'
    },
    retrieved_at: '2026-09-29T08:00:00Z'
  }
];

export class NisrService {
  static getAllIndicators() {
    return officialNisrIndicators;
  }

  static getIndicatorByCode(code) {
    return officialNisrIndicators.find(i => i.indicator_code === code) || null;
  }

  static getEmploymentIndicators() {
    return officialNisrIndicators.filter(i => 
      i.indicator_code.includes('EMP') || i.indicator_code.includes('AGRI') || i.indicator_code.includes('YOUTH')
    );
  }
}
