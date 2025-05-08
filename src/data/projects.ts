import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Brand Identity Design',
    category: 'Branding',
    description: 'Complete brand identity design for a modern tech startup, including logo, color palette, typography, and brand guidelines.',
    thumbnail: '/asset/LOGO/3.png',
    images: [
     
    ],
    tags: ['Branding', 'Logo Design', 'Typography', 'Guidelines'],
    featured:false,
    date: '2024-06-15',
    client: 'TechVision'
  },
  {
    id: '2',
    title: ' Website Redesign',
    category: 'Web Design',
    description: 'Complete redesign of an e-commerce platform to improve user experience, conversion rates, and mobile responsiveness.',
    thumbnail: '/asset/WEB/1.png',
    images: [
     '/asset/WEB/1.png',
     '/asset/WEB/2.png',
     '/asset/WEB/3.png',
     '/asset/WEB/4 (2).png',
     '/asset/WEB/5.png',
     '/asset/WEB/6.png',
     '/asset/WEB/7.png',
     '/asset/WEB/8.png', 
    ],
    tags: ['Web Design', 'UX/UI', 'E-commerce', 'Responsive'],
    featured: true,
    date: '2024-05-10',
    client: 'Fashion Outlet'
  },
  {
    id: '3',
    title: 'Mobile App UI Design',
    category: 'UI/UX',
    description: 'UI/UX design for a fitness tracking mobile application with clean, intuitive interfaces and engaging user experience.',
    thumbnail: 'https://images.pexels.com/photos/6633920/pexels-photo-6633920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: ['/asset/WEB/app-1.png',
      '/asset/WEB/app_2.png',
     '/asset/WEB/app-1.png', 
      
    ],

    tags: ['UI/UX', 'Mobile App', 'Interface Design', 'Wireframing'],
    featured: true,
    date: '2024-04-22',
    client: 'FitTrack'
  },
  {
    id: '4',
    title: 'Architecture exterior & Interior Design',
    category: 'Interior',
    description: 'Elegant packaging design for a premium skincare line, focusing on sustainability and brand storytelling.',
    thumbnail: '/asset/Architecture/01.jpg',
    images: [
      
      
    ],
    tags: ['Building Architecture', 'Exterior Design', 'Interior Design', 'CEO'],
    featured:false,
    date: '2021-03-15',
    client: 'Glow Naturals'
  },
  {
    id: '5',
    title: 'Print Design',
    category: '',
    description: 'Cohesive social media campaign with engaging visuals and content strategy for a new product launch.',
    thumbnail: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      
    ],
    tags: ['Flyer Design','Brochure Design', '', 'performance'],
    featured:false,
    date: '2022-02-28',
    client: 'Urban Footwear'
  },
  {
    id: '6',
    title: 'Infographic & Presentation Design',
    category: 'Print',
    description: 'Editorial design for a lifestyle magazine featuring custom typography, photography direction, and elegant layouts.',
    thumbnail:'/asset/Presentation/011.webp', 
    images: [
      

      
    ],
    tags: ['Presentation Design', 'Infographic Design', 'Resume Design',],
    featured:false,
    date: '2020-01-15',
    client: 'Essenc Resume'
  }
];