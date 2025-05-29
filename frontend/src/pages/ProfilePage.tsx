import React from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStats from '../components/profile/ProfileStats';
import UserDetails from '../components/UserDetails';

export default function ProfilePage() {
  const [profileImage, setProfileImage] = React.useState<string | undefined>(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  );

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const userDetails = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    company: "Tech Innovations Inc.",
    role: "Business Owner",
    memberSince: "January 2024",
    ranking: "Silver" as const
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-beige-50 to-primary-100 p-6 pb-20">
      <div className="max-w-3xl mx-auto space-y-6">
        <ProfileHeader
          name={userDetails.name}
          role={userDetails.role}
          ranking={userDetails.ranking}
          imageUrl={profileImage}
          onImageUpload={handleImageUpload}
        />

        <ProfileStats
          totalInvestment={25430}
          investmentChange={12}
          activePools={3}
          pendingInvites={2}
        />

        <UserDetails user={userDetails} />

        <div className="glass-card rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { date: '2024-03-15', action: 'Investment Pool Joined', amount: '$5,000' },
              { date: '2024-03-10', action: 'Dividend Received', amount: '$250' },
              { date: '2024-03-05', action: 'Profile Updated', amount: null },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 glass-card rounded-lg">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.date}</p>
                </div>
                {activity.amount && (
                  <span className="text-primary-600 font-medium">{activity.amount}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
