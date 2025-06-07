
import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, Users, BookOpen, Award, ArrowRight, CheckCircle } from 'lucide-react';

const Landing: React.FC = () => {
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
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-earth-brown rounded-xl flex items-center justify-center">
                <TreePine className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold text-earth-brown">Vruksha</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-earth-brown hover:text-deep-brown transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-earth-brown text-white rounded-lg hover:bg-deep-brown transition-colors nature-shadow"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 earth-gradient opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Growing Knowledge,
              <span className="text-earth-brown block">Nurturing Minds</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              Vruksha is a comprehensive educational platform that connects administrators, teachers, and students 
              in a seamless learning ecosystem. Experience growth through wisdom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link
                to="/register"
                className="px-8 py-4 bg-earth-brown text-white rounded-lg hover:bg-deep-brown transition-colors nature-shadow-lg inline-flex items-center justify-center"
              >
                Start Your Journey
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 border border-earth-brown text-earth-brown rounded-lg hover:bg-earth-brown hover:text-white transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
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
              <div key={index} className="bg-card rounded-xl p-8 nature-shadow-lg border border-border hover:shadow-xl transition-shadow">
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
      <section className="py-20">
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
              <div className="w-full h-96 bg-gradient-to-br from-warm-beige to-cream rounded-2xl nature-shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <TreePine className="text-earth-brown mx-auto mb-4" size={80} />
                  <h3 className="text-2xl font-bold text-earth-brown mb-2">Growth Through Learning</h3>
                  <p className="text-muted-foreground">Nurturing educational excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 earth-gradient">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Educational Experience?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of educators and students already growing with Vruksha.
          </p>
          <Link
            to="/register"
            className="px-8 py-4 bg-white text-earth-brown rounded-lg hover:bg-gray-100 transition-colors nature-shadow-lg inline-flex items-center justify-center font-semibold"
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
              <div className="w-8 h-8 bg-earth-brown rounded-lg flex items-center justify-center">
                <TreePine className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-earth-brown">Vruksha</span>
            </div>
            <p className="text-muted-foreground text-center md:text-right">
              © 2024 Vruksha. Growing knowledge, nurturing minds.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
