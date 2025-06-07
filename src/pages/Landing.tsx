
import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, Users, BookOpen, Award, ArrowRight, CheckCircle } from 'lucide-react';
import ThemeToggleButton from './ThemeToggleButton';
  function Landing() {
    const features = [
      {
        icon: Users,
        title: 'Multi-Role Platform',
        description: 'Designed for Super Admins, Admins, Teachers, and Students with role-specific features.'
      },
      {
        icon: BookOpen,
        title: 'Rich Content Support',
        description: 'Upload and manage text, video, and audio content with automatic formatting.'
      },
      {
        icon: Award,
        title: 'Assessment Management',
        description: 'Create comprehensive assessments and track student progress effectively.'
      }
    ];

    const benefits = [
      'Personalized learning recommendations',
      'Streamlined content verification process',
      'Advanced analytics and reporting',
      'Seamless multi-organization management',
      'Interactive feedback system',
      'Mobile-responsive design'
    ];

    return (
      <div className="min-h-screen earth-gradient    ">
        {/* Navigation */}
        <nav className="bg-card border-b border-border    " >
          <div className="max-w-7xl mx-auto px-4 sm:px-6   lg:px-8">
            <div className="flex justify-between  items-center py-6">
              <div className="flex items-center space-x-3">
                <img
                  src="../src/assets/logov.png"
                  alt="Vruksha Logo"
                  className="w-20 h-20 rounded-xl object-cover " />
                <span className="text-2xl font-bold text-earth-brown dark:text-white ">Vruksh</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-earth-brown border border-earth-brown dark:text-white  hover:text-white transition-colors duration-300 hover:bg-earth-brown rounded-lg"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-earth-brown border border-earth-brown dark:text-white hover:text-white transition-colors duration-300 hover:bg-earth-brown rounded-lg"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <section className="relative py-20 overflow-hidden bg-gray-100 dark:bg-gray-950" >
          {/* Decorative background */}
          <div className="absolute inset-0 earth-gradient opacity-5 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Hero Slider */}
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
              {/* Simple slider logic */}
              {(() => {
                const slides = [
                  {
                    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80",
                    title: "Empowering Institutions",
                    description: "Manage, teach, and learn with ease on a unified platform."
                  },
                  {
                    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
                    title: "Seamless Collaboration",
                    description: "Connect teachers, students, and admins for better outcomes."
                  },
                  {
                    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80",
                    title: "Modern Learning Tools",
                    description: "Interactive content, assessments, and analytics at your fingertips."
                  }
                ];
                const [current, setCurrent] = React.useState(0);
                React.useEffect(() => {
                  const timer = setTimeout(() => setCurrent((current + 1) % slides.length), 4000);
                  return () => clearTimeout(timer);
                }, [current]);
                return (
                  <div className="w-full h-full relative">
                    {slides.map((slide, idx) => (
                      <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-700 ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                        aria-hidden={idx !== current}
                      >
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-6">
                          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">{slide.title}</h2>
                          <p className="text-lg md:text-2xl text-white/90 mb-6 drop-shadow">{slide.description}</p>
                        </div>
                      </div>
                    ))}
                    {/* Slider dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                      {slides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrent(idx)}
                          className={`w-3 h-3 rounded-full ${idx === current ? "bg-earth-brown" : "bg-white/60"} border border-earth-brown transition-colors`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
          {/* Dark/Light Mode Toggle Button */}
          <div className="fixed bottom-6 right-6 z-50">
            <button className="bg-earth-brown text-white rounded-full shadow-lg p-3 hover:bg-earth-brown/90 transition-colors focus:outline-none focus:ring-2 focus:ring-earth-brown focus:ring-offset-2">
              <ThemeToggleButton />
            </button>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Powerful Features for Modern Education
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built with the latest technologies to provide a seamless and intuitive experience for all users.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-8 nature-shadow-lg border border-border hover:shadow-xl transition-shadow dark:shadow-[0_4px_32px_0_rgba(120,120,120,0.25)]"
                >
                  <div className="w-16 h-16 bg-earth-brown rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white dark:bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Why Choose Vruksha?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our platform is designed to foster growth, collaboration, and knowledge sharing
            across educational institutions of all sizes.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="text-sage-green flex-shrink-0" size={20} />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
              </div>
              <div className="relative">
          <div className="w-full h-96 bg-gradient-to-br from-warm-beige to-cream dark:from-card dark:to-card rounded-2xl nature-shadow-lg flex items-center justify-center relative overflow-hidden">
            {/* Luminent effect for dark mode */}
            <div className="hidden dark:block absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-sage-green/20 blur-2xl opacity-60" />
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-1/3 bg-sage-green/40 rounded-full blur-3xl opacity-40" />
            </div>
            <div className="text-center relative z-10">
              <img
                src="../src/assets/logov.png"
                alt="Vruksha Logo"
                className="w-32 h-32 mx-auto mb-4 rounded-xl object-cover"
              />
              <h3 className="text-2xl font-bold text-earth-brown mb-2">Growth Through Learning</h3>
              <p className="text-muted-foreground">Nurturing educational excellence</p>
            </div>
          </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 earth-gradient dark:bg-earth-brown">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white dark:text-foreground mb-6">
              Ready to Transform Your Educational Experience?
            </h2>
            <p className="text-xl text-white/90 dark:text-muted-foreground mb-8">
              Join thousands of educators and students already growing with Vruksha.
            </p>
            <Link
              to="/register"
              className="px-8 py-4 bg-earth-brown text-white rounded-lg transition-colors duration-300 ease-in-out nature-shadow-lg inline-flex items-center justify-center font-semibold dark:bg-card dark:text-earth-brown dark:hover:bg-white/50 hover:bg-white hover:text-earth-brown"
            >
              Get Started Today
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <img
                  src="../src/assets/logov.png"
                  alt="Vruksha Logo"
                  className="w-8 h-8 rounded-lg object-cover"
                />
                
                <span className="text-xl font-bold text-earth-brown">Vruksha</span>
              </div>
              <p className="text-muted-foreground text-center md:text-right">
                © 2025 Vruksha. Growing knowledge, nurturing minds.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

export default Landing;
