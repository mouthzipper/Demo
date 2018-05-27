import Welcome from './Welcome';
import AgentHome from './AgentHome';
import AgentSignin from './AgentSignin';
import AgentSignup from './AgentSignup';

export default [
  {
    path: '/',
    component: Welcome,
    exact: true,
    title: 'Home',
    description: '',
    socialText: '',
    image: ''
  },
  {
    path: '/agent/signin',
    component: AgentSignin,
    exact: true,
    title: 'Agent Sign in',
    description: '',
    socialText: '',
    image: ''
  },
  {
    path: '/agent',
    component: AgentHome,
    exact: true,
    title: 'Agent Home',
    description: '',
    socialText: '',
    image: ''
  },
  {
    path: '/agent/signup',
    component: AgentSignup,
    exact: true,
    title: 'Agent Sign up',
    description: '',
    socialText: '',
    image: ''
  }
];
