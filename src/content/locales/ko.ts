import { locations, technologies as tech } from '../facts.ts';
import type { PortfolioContent } from '../schema';

export const koreanContent = {
  locale: 'ko',
  metadata: {
    title: 'Guillaume Becker | 엔지니어링 리더 · 소프트웨어 아키텍트',
    description:
      '서울에서 활동하는 소프트웨어 엔지니어링 리더입니다. 프론트엔드 아키텍처, 엔지니어링 팀 리딩, 플랫폼 개발을 경험했으며 소프트웨어 구현과 배포에도 직접 참여해 왔습니다.',
    ogLocale: 'ko_KR',
  },
  hero: {
    discipline: '소프트웨어 엔지니어링',
    heading: '엔지니어링 리더 · 소프트웨어 아키텍트',
    introduction:
      '서울에서 활동하는 소프트웨어 엔지니어입니다. 11년 이상 웹 제품을 개발하고 프론트엔드 팀을 이끌며 제품을 뒷받침하는 플랫폼을 개선해 왔습니다. 코드와 시스템을 직접 다루면서 아키텍처와 엔지니어링 방식도 함께 고민하는 일을 좋아합니다.',
    action: '프로젝트 살펴보기',
  },
  sections: {
    about: { title: '소개', navigationLabel: '소개' },
    work: { title: '주요 프로젝트', navigationLabel: '프로젝트' },
    experience: { title: '경력', navigationLabel: '경력' },
    skills: { title: '기술 및 전문 분야', navigationLabel: '기술' },
    education: { title: '학력 및 자격', navigationLabel: '학력' },
    contact: { title: '연락하기', navigationLabel: '연락처' },
  },
  about: [
    '산업용 SaaS, IoT, 외국어 학습, 핀테크 분야에서 일해 왔습니다. 제품 개발, 프론트엔드 아키텍처, 팀 리딩, 개발자 경험 개선을 두루 경험했으며, 기존 애플리케이션을 현대화하고 새 제품에 공통으로 쓰이는 개발 기반을 구축했습니다.',
    '팀이 실용적인 기술 결정을 내리도록 돕고, 소프트웨어를 개발하고 유지보수하는 방식을 개선하며, 구현에도 직접 참여하는 일을 좋아합니다. 최근에는 Python, FastAPI, AI를 실무에 적용하는 워크플로도 살펴보고 있습니다.',
  ],
  contact:
    '엔지니어링 리더십, 프론트엔드 아키텍처 또는 소프트웨어 프로젝트에 관해 이야기를 나누고 싶다면 LinkedIn으로 연락해 주세요.',
  links: { linkedin: 'LinkedIn', github: 'GitHub' },
  experienceDetails: {
    show: '상세 내용 보기',
    hide: '상세 내용 숨기기',
    forCompany: '({company} 경력)',
  },
  ui: {
    skipLink: '본문 바로가기',
    mainNavigation: '주요 메뉴',
    themeGroup: '테마 선택',
    themeLabels: { system: '시스템 설정', light: '라이트', dark: '다크' },
    backToTop: '맨 위로',
    sourceCode: '소스 코드',
    portraitAlt: 'Guillaume Becker의 인물 사진',
    languageNavigation: '언어',
  },
  dateSeparator: '–',
  earlierExperienceLabel: '초기 경력',
  locationLabels: {
    [locations.seoul]: '대한민국 서울',
    [locations.france]: '프랑스',
    [locations.toulouseParis]: '프랑스 툴루즈·파리',
  },
  selectedWork: [
    {
      id: 'modernization',
      employerId: 'glassdome',
      title: '제품 개발을 이어가며 프론트엔드 현대화',
      context: '프론트엔드 아키텍처',
      summary:
        '기존 React 애플리케이션을 모듈형 Next.js 프론트엔드 플랫폼으로 전환하는 작업을 주도했습니다. 기존 페이지와 새 페이지를 함께 운영할 수 있게 설계해 제품 개발을 이어가면서 아키텍처를 개선할 수 있도록 했습니다.',
    },
    {
      id: 'foundations',
      employerId: 'glassdome',
      title: '재사용 가능한 프론트엔드 기반 구축',
      context: '산업용 소프트웨어',
      summary:
        '제조업의 지속가능성 관련 업무를 지원하는 프론트엔드 플랫폼을 구축했습니다. 관리자용과 고객용 애플리케이션을 분리하면서도 두 애플리케이션이 도메인 기능과 공통 인프라를 공유하도록 구성했습니다.',
    },
    {
      id: 'practices',
      employerId: 'glassdome',
      title: '일상 업무에 엔지니어링 표준 정착시키기',
      context: '개발자 경험 및 팀 리더십',
      summary:
        '명확한 문서화, 코드 리뷰, 테스트 기반, 자동화된 검사를 통해 팀이 엔지니어링 표준을 더 쉽게 따를 수 있도록 개선을 주도했습니다. 일상적인 개발과 배포 속도를 유지하면서 팀이 일관된 판단을 내리도록 돕는 것이 목표였습니다.',
    },
  ],
  independentProjects: {
    title: '개인 프로젝트',
    sourceLink: '소스 코드 보기',
    projects: {
      clinicalTrialsExplorer: {
        title: 'Clinical Trials Explorer',
        context: 'AI 응용 · 데이터 시각화',
        summary:
          '자연어 질문과 인터랙티브 차트로 임상시험 데이터를 탐색하는 실험용 풀스택 애플리케이션입니다. AI가 질문 해석을 돕고, 데이터 집계는 정해진 규칙에 따라 수행하며, 필요에 따라 출처를 표시할 수 있습니다.',
      },
    },
  },
  roleTitles: {
    glassdomeHead: '클라이언트 소프트웨어 엔지니어링 총괄',
    glassdomeLead: '시니어 소프트웨어 엔지니어 / 프론트엔드 리드',
    gofluentLead: '프론트엔드 소프트웨어 엔지니어(리드)',
    awairLead: '프론트엔드 소프트웨어 엔지니어(리드)',
    plutusdsLead: '프론트엔드 리드 / 프로덕트 매니저 / 소프트웨어 엔지니어',
    korbitEngineer: '소프트웨어 엔지니어',
    earlierEngineer: '소프트웨어 엔지니어링 인턴 및 파트타임 근무',
  },
  experienceCopy: {
    glassdome: {
      summary:
        '프론트엔드 엔지니어링을 이끌며 아키텍처 개선, 플랫폼 현대화, 제품 개발 및 배포에 직접 참여했습니다. 공통 Next.js/React 애플리케이션, 엔지니어링 표준, CI/CD, 테스트, 현지화를 다뤘으며 프로덕트, 디자인, QA, 백엔드 팀과 협업했습니다.',
      details: [
        '합류 당시 최대 7명 규모였던 프론트엔드 팀을 이끌며 멘토링, 기술 방향 설정, 채용 참여, 개발 및 배포 일정 조율을 맡았습니다.',
        '기존 프론트엔드 애플리케이션을 평가하고, 제품 개발 및 배포를 이어가면서 모듈형 React/Next.js 워크스페이스로 단계적으로 전환하는 작업을 주도했습니다.',
        '제조업 고객용 및 관리자용 애플리케이션의 공통 기반을 구축하는 데 기여했습니다. 이 기반에는 재사용 가능한 도메인 모듈, 인증 인프라, API 인프라가 포함됐습니다.',
        '프로덕트, 디자인, QA, 백엔드 팀과 협업해 아키텍처 문서, 개발 표준, 리뷰 방식, 테스트 기반, CI/CD 자동화를 개선했습니다.',
        '아키텍처 결정 기록(ADR), 코딩 표준, 온보딩 체계, 리뷰 절차, 릴리스 방식, 아키텍처 가이드라인을 마련해 프론트엔드 기술 운영 체계를 세웠습니다. 이 기준과 절차는 엔지니어링 조직 전반에 도입됐습니다.',
        '기술 조사와 개념 검증을 통해 AI 응용 가능성을 살펴봤습니다. AI를 활용한 개발 워크플로와 제조업 지속가능성 애플리케이션의 자동화 등을 검토했습니다.',
        'SOC 2, ISO 27001, TISAX 관련 보안 및 규정 준수 활동을 주도하고 지원했습니다.',
      ],
    },
    gofluent: {
      summary:
        '사내 웹 및 모바일 애플리케이션 개발, 프론트엔드 아키텍처 개선안 제시, 개발 및 배포 절차 개선에 참여했습니다.',
      details: [],
    },
    awair: {
      summary:
        '프론트엔드 팀을 이끌고 공통 플랫폼 기반을 구축했습니다. 애플리케이션 현대화, 릴리스 자동화, 여러 직군이 협업하는 제품 개발 및 배포를 지원했습니다.',
      details: [
        '팀원 코칭, 엔지니어링 표준 적용, 팀 간 조율을 통해 프론트엔드 팀을 이끌었습니다.',
        '여러 제품에서 공통으로 사용하는 프론트엔드 워크스페이스와 모노레포 기반을 설계했습니다.',
        '고객용 애플리케이션을 Next.js 기반으로 현대화하고 릴리스 및 미리보기 절차를 개선하는 데 기여했습니다.',
      ],
    },
    plutusds: {
      summary:
        '가상자산 거래소와 DeFi 제품에서 프론트엔드 리딩과 제품 관리를 겸했습니다. 고객용 인터페이스부터 공통 프론트엔드 기반과 릴리스 작업까지 담당했습니다.',
      details: [
        '가상자산 거래소와 DeFi 제품의 제품 관리와 프론트엔드 리딩을 겸했습니다.',
        '고객용 인터페이스와 재사용 가능한 프론트엔드 기반을 만드는 데 기여했으며 릴리스 절차와 운영 도구 관련 작업을 지원했습니다.',
      ],
    },
    korbit: {
      summary:
        '가상자산 거래소와 관련 서비스를 위한 고객용 및 사내용 핀테크 애플리케이션을 개발하며 프론트엔드, 백엔드, 클라우드 인프라를 두루 다뤘습니다.',
      details: [
        '고객용 및 사내용 거래소, 거래, 송금, 관리 서비스 개발에 기여했습니다.',
        'React, Ruby on Rails, GraphQL, AWS를 사용해 프론트엔드, 백엔드, 인프라를 두루 다뤘습니다.',
      ],
    },
    earlier: {
      summary: '학위 과정 중 Webedia와 Yoopies에서 웹 및 백엔드 프로젝트에 참여했습니다.',
      details: [],
    },
  },
  skillGroups: [
    {
      id: 'leadership',
      title: '리더십 및 아키텍처',
      items: [
        '프론트엔드 아키텍처',
        '엔지니어링 매니지먼트',
        '팀 리더십',
        '기술 전략',
        '멘토링',
        '코드 리뷰',
        '디자인 시스템',
        '모노레포',
      ],
    },
    {
      id: 'frontend',
      title: '프론트엔드 및 플랫폼',
      items: [
        tech.typescript,
        tech.javascript,
        tech.react,
        tech.next,
        tech.redux,
        tech.rtk,
        tech.tailwind,
        tech.storybook,
        tech.chromatic,
      ],
    },
    {
      id: 'quality',
      title: '소프트웨어 품질 및 배포',
      items: [
        tech.actions,
        tech.cicd,
        tech.playwright,
        tech.jest,
        tech.testingLibrary,
        '릴리스 절차',
        '엔지니어링 표준',
        '모니터링',
      ],
    },
    {
      id: 'backend',
      title: '백엔드 및 AI 응용',
      note: 'Python, FastAPI, 대규모 언어 모델(LLM) 연동은 최근 직접 다루고 살펴보고 있는 분야입니다.',
      items: [
        tech.node,
        tech.python,
        tech.fastapi,
        'REST API',
        tech.sql,
        'LLM 연동',
        '구조화된 출력',
        'AI 지원 소프트웨어 개발',
      ],
    },
    {
      id: 'cloud',
      title: '클라우드 및 인프라',
      items: [tech.aws, tech.cloudflare, tech.docker, tech.vercel, tech.sentry],
    },
  ],
  educationCopy: {
    lca: { title: '전과정평가(LCA) 실무자 자격' },
    epitech: { title: '컴퓨터과학 석사' },
    chungAng: { title: '교환학생 프로그램' },
  },
} as const satisfies PortfolioContent;
