import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Clock,
  BarChart3,
  Target,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Award,
  TrendingUp,
  Users,
  ChevronRight,
  Mail,
  Sparkles,
  Brain,
  FileText,
  Edit3,
  Search,
  Layout,
  Share2,
  BarChart2,
  RefreshCw,
  Menu,
  X,
  UserCircle2
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [waitlistForm, setWaitlistForm] = useState({
    name: '',
    email: '',
    desiredPlan: 'professional',
    marketingConsent: false
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSupabaseConnected, setIsSupabaseConnected] = React.useState(!!supabase);

  React.useEffect(() => {
    setIsSupabaseConnected(!!supabase);
  }, []);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSupabaseConnected || !supabase) {
      setFormStatus('error');
      setErrorMessage('Database connection not available. Please try again later.');
      return;
    }

    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('waitlist_signups')
        .insert({
          name: waitlistForm.name,
          email: waitlistForm.email,
          desired_plan: waitlistForm.desiredPlan,
          marketing_consent: waitlistForm.marketingConsent
        });

      if (error) throw error;
      
      setFormStatus('success');
      setWaitlistForm({
        name: '',
        email: '',
        desiredPlan: 'professional',
        marketingConsent: false
      });
    } catch (error: any) {
      console.error('Waitlist submission error:', error);
      setFormStatus('error');
      setErrorMessage(
        error.message?.includes('waitlist_signups_email_key')
          ? 'This email is already on the waitlist.'
          : 'Something went wrong. Please try again.'
      );
    }
  };

  const packages = [
    {
      name: 'Essential',
      price: 249,
      setupFee: 99,
      features: [
        '3 weekly automated posts',
        'Custom-tailored local content',
        'Engagement-focused copywriting',
        'Performance analytics',
        'Instant activation - Start today!',
        '30-day money-back guarantee'
      ],
      recommended: true,
      available: true,
      highlight: 'Perfect for getting started'
    },
    {
      name: 'Professional',
      price: 499,
      setupFee: 199,
      features: [
        'Everything in Essential Package',
        'Weekly professional AI-generated video',
        'Custom branding integration',
        'Advanced audience targeting',
        'Content calendar planning'
      ],
      recommended: false,
      available: false
    },
    {
      name: 'Premium',
      price: 749,
      setupFee: 299,
      features: [
        'Everything in Professional Package',
        'Weekly AI Digital Twin video',
        'Priority content optimization',
        'Advanced analytics dashboard',
        'Strategic content consultation'
      ],
      recommended: false,
      available: false
    }
  ];

  const benefits = [
    {
      icon: <UserCircle2 className="w-8 h-8 text-blue-600" />,
      title: 'AI-Generated Digital Twin',
      description: 'Maximize your social media presence with your digital twin while maintaining your personal touch'
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: 'Save 15+ Hours Weekly',
      description: 'Focus on closing deals while we handle your social presence'
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: '300% More Engagement',
      description: 'AI-optimized content that resonates with your audience'
    },
    {
      icon: <Building2 className="w-8 h-8 text-blue-600" />,
      title: 'Full Automation',
      description: 'Set it and forget it - we handle everything for you'
    }
  ];

  const automationSteps = [
    {
      icon: <Brain className="w-12 h-12 text-blue-600" />,
      title: "Strategy Development",
      description: "AI analyzes market trends and your goals"
    },
    {
      icon: <Search className="w-12 h-12 text-blue-600" />,
      title: "Topic Research",
      description: "Identifies high-impact content opportunities"
    },
    {
      icon: <FileText className="w-12 h-12 text-blue-600" />,
      title: "Content Creation",
      description: "Generates engaging, market-specific content"
    },
    {
      icon: <Edit3 className="w-12 h-12 text-blue-600" />,
      title: "Editing & SEO",
      description: "Optimizes for maximum visibility"
    },
    {
      icon: <Layout className="w-12 h-12 text-blue-600" />,
      title: "Video Design",
      description: "Creates stunning videos"
    },
    {
      icon: <Share2 className="w-12 h-12 text-blue-600" />,
      title: "Distribution",
      description: "Publishes across all platforms"
    },
    {
      icon: <BarChart2 className="w-12 h-12 text-blue-600" />,
      title: "Analytics",
      description: "Tracks performance metrics"
    },
    {
      icon: <RefreshCw className="w-12 h-12 text-blue-600" />,
      title: "Optimization",
      description: "Continuously improves results"
    }
  ];

  const faqs = [
    {
      question: 'How does AI improve my real estate marketing?',
      answer: 'Our AI analyzes market trends, buyer behavior, and engagement patterns to create highly targeted content that resonates with your audience, resulting in better engagement and lead generation.'
    },
    {
      question: 'Can I customize the content?',
      answer: 'Absolutely! While our AI generates the initial content, you have full control to review and modify any posts before they go live.'
    },
    {
      question: 'What kind of ROI can I expect?',
      answer: 'Our clients typically see a 3-5x return on investment within the first 6 months through increased leads and closings.'
    },
    {
      question: 'Is there a contract commitment?',
      answer: 'No long-term contracts required. Our services are month-to-month with a 30-day satisfaction guarantee.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-blue-600" />
              <div className="ml-2">
                <span className="text-xl font-bold text-gray-900">NextGen</span>
                <span className="text-xl font-light text-blue-600">Realty</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#benefits" className="text-gray-600 hover:text-gray-900 transition-colors">Why Us</a>
              <a href="#automation" className="text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="/demo" className="text-gray-600 hover:text-gray-900 transition-colors">Demo</a>
              <a href="mailto:dgf84@outlook.com" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
                <Mail className="w-4 h-4 mr-2" />Contact
              </a>
              <button 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                <a href="#benefits" className="text-gray-600 hover:text-gray-900">Why Us</a>
                <a href="#automation" className="text-gray-600 hover:text-gray-900">How It Works</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
                <a href="/demo" className="text-gray-600 hover:text-gray-900">Demo</a>
                <a href="mailto:dgf84@outlook.com" className="text-gray-600 hover:text-gray-900 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />Contact
                </a>
                <button 
                  onClick={() => {
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI-Powered Marketing for Realtors<br />
              Let AI Grow Your Real Estate Business
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Automated, and AI-powered Social Media Marketing Specifically Designed for Realtors.<br />
              Reclaim Your Time & Boost Productivity with a Digital Twin!
            </p>
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center"
            >
              Start Today <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white"></div>
      </div>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Top Realtors Choose Us</h2>
            <p className="text-xl text-gray-600">Proven results that drive your real estate business forward</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Section */}
      <section id="automation" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">End-to-End Content Automation</h2>
            <p className="text-xl text-gray-600 mb-12">From strategy to optimization, our AI handles everything</p>
          </div>
          
          {/* Process Flow Visualization */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {automationSteps.slice(0, 4).map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
                  <div className="flex justify-center mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-blue-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {automationSteps.slice(4).map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
                  <div className="flex justify-center mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-blue-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Growth Plan</h2>
            <p className="text-xl text-gray-600">Risk free with our no questions asked 30-day money-back guarantee</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-lg p-8 ${
                  pkg.recommended ? 'ring-2 ring-blue-600 transform scale-105' : ''
                }`}
              >
                {!pkg.available && (
                  <span className="bg-gray-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                    Coming Soon
                  </span>
                )}
                {pkg.recommended && (
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                    Available Now
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold mb-6">${pkg.price}<span className="text-lg text-gray-600">/mo</span></div>
                {pkg.highlight && (
                  <p className="text-blue-600 font-medium mb-4">{pkg.highlight}</p>
                )}
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {pkg.available ? (
                  <button 
                    onClick={() => navigate('/signup')}
                    className={`w-full py-3 rounded-lg font-semibold ${
                      pkg.recommended 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    Start Today
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' });
                      setWaitlistForm(prev => ({ ...prev, desiredPlan: pkg.name.toLowerCase() }));
                    }}
                    className="w-full py-3 rounded-lg font-semibold bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                  >
                    Join Waitlist
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist-form" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Join the Waitlist</h2>
              <p className="text-lg text-gray-600">
                Be among the first to access our Professional and Premium plans. 
                Waitlist members receive exclusive early access and special launch offers.
              </p>
            </div>

            {!isSupabaseConnected ? (
              <div className="text-center p-6 bg-yellow-50 rounded-lg">
                <p className="text-yellow-800">
                  Please connect to Supabase using the "Connect to Supabase" button in the top right to enable waitlist signup.
                </p>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={waitlistForm.name}
                    onChange={(e) => setWaitlistForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={waitlistForm.email}
                    onChange={(e) => setWaitlistForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="plan" className="block text-sm font-medium text-gray-700 mb-1">
                    Desired Plan
                  </label>
                  <select
                    id="plan"
                    value={waitlistForm.desiredPlan}
                    onChange={(e) => setWaitlistForm(prev => ({ ...prev, desiredPlan: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="professional">Professional Plan ($499/mo)</option>
                    <option value="premium">Premium Plan ($749/mo)</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="marketing"
                    checked={waitlistForm.marketingConsent}
                    onChange={(e) => setWaitlistForm(prev => ({ ...prev, marketingConsent: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="marketing" className="ml-2 block text-sm text-gray-700">
                    I agree to receive marketing communications about special offers and updates
                  </label>
                </div>

                {formStatus === 'error' && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                    {errorMessage}
                  </div>
                )}

                {formStatus === 'success' && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-lg">
                    Thanks for joining the waitlist! We'll notify you when these plans become available.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className={`w-full py-4 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors ${
                    formStatus === 'submitting' ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {formStatus === 'submitting' ? 'Submitting...' : 'Join Waitlist'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our AI-powered marketing</p>
          </div>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Real Estate Business?</h2>
          <p className="text-xl mb-8">Start today and see the difference AI-powered marketing can make.</p>
          <button 
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center"
          >
            Start Today <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          <p className="mt-4 text-blue-100">30-day money-back guarantee • Cancel anytime • 24/7 support</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">RealAI Marketing</h3>
              <p className="text-gray-400">Transforming real estate marketing with AI technology</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="mailto:dgf84@outlook.com" className="text-gray-400 hover:text-white flex items-center">
                  <Mail className="w-4 h-4 mr-2" />Contact
                </a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  {/* Add social icons here */}
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 RealAI Marketing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;