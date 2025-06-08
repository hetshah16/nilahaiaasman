import React, { useState } from 'react';
import { User, Mail, Building, Calendar, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    organizationName: user?.organizationName || '',
    bio: 'Passionate educator with 5+ years of experience in creating engaging learning content.',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA'
  });

  const handleSave = () => {
    updateUser({
      name: formData.name,
      organizationName: formData.organizationName
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <button
          onClick={() => {
            if (isEditing) handleSave();
            else setIsEditing(true);
          }}
          className="px-4 py-2 bg-earth-brown text-white rounded-lg hover:bg-deep-brown transition-colors flex items-center space-x-2"
        >
          {isEditing ? <Save size={16} /> : <User size={16} />}
          <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl p-6 border border-border nature-shadow-lg">
            <h2 className="text-xl font-semibold text-foreground mb-4">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-brown bg-background"
                  />
                ) : (
                  <p className="text-foreground">{formData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-brown bg-background"
                  />
                ) : (
                  <p className="text-foreground">{formData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-brown bg-background"
                  />
                ) : (
                  <p className="text-foreground">{formData.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-brown bg-background"
                  />
                ) : (
                  <p className="text-foreground">{formData.location}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-muted-foreground mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-brown bg-background"
                />
              ) : (
                <p className="text-foreground">{formData.bio}</p>
              )}
            </div>

            {isEditing && (
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-earth-brown text-white rounded-lg hover:bg-deep-brown transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Summary */}
        <div className="space-y-6">
          <div className="bg-card rounded-xl p-6 border border-border nature-shadow-lg text-center">
            <div className="w-24 h-24 bg-earth-brown rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={32} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{user?.name}</h3>
            <p className="text-sm text-muted-foreground capitalize mb-2">{user?.role.replace('-', ' ')}</p>
            {user?.organizationName && (
              <div className="flex items-center justify-center space-x-2 text-sm text-sage-green">
                <Building size={14} />
                <span>{user.organizationName}</span>
              </div>
            )}
          </div>

          <div className="bg-card rounded-xl p-6 border border-border nature-shadow-lg">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Member Since</span>
                <span className="text-foreground">Jan 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Active</span>
                <span className="text-foreground">Today</span>
              </div>
              {user?.role === 'teacher' && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Content Uploaded</span>
                  <span className="text-foreground">12</span>
                </div>
              )}
              {user?.role === 'student' && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Courses Completed</span>
                  <span className="text-foreground">8</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;