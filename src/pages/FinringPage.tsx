import React from 'react';
import { MessageSquare, ThumbsUp, Share2, Users } from 'lucide-react';

const posts = [
  {
    id: 1,
    author: {
      name: 'Priya Sharma',
      company: 'Tech Innovations Ltd',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
    },
    content: 'Just implemented the S.T.O.P method in our company. Seeing great results in financial management!',
    likes: 245,
    comments: 28,
    shares: 12
  },
  {
    id: 2,
    author: {
      name: 'Rahul Mehta',
      company: 'Growth Ventures',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'
    },
    content: 'Hosting a workshop on effective budgeting strategies next week. Join us to learn more about financial planning!',
    likes: 189,
    comments: 42,
    shares: 15
  }
];

const upcomingSessions = [
  {
    id: 1,
    title: 'Financial Planning Workshop',
    date: '2024-03-25',
    time: '14:00',
    host: 'Sarah Johnson',
    attendees: 156
  },
  {
    id: 2,
    title: 'Investment Strategies Seminar',
    date: '2024-03-28',
    time: '15:30',
    host: 'Michael Chen',
    attendees: 203
  }
];

export default function FinringPage() {
  return (
    <div className="min-h-screen glass-container p-6 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="glass-card card-container">
          <h1 className="text-2xl font-bold">Finring Community</h1>
          <p className="text-gray-600">Connect with industry leaders and share insights</p>
        </div>

        {/* Upcoming Sessions */}
        <div className="glass-card card-container">
          <h2 className="text-xl font-bold mb-4">Upcoming Sessions</h2>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="neo-card p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{session.title}</h3>
                    <p className="text-sm text-gray-600">
                      {session.date} at {session.time}
                    </p>
                    <p className="text-sm text-primary-600">Hosted by {session.host}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{session.attendees}</span>
                  </div>
                </div>
                <button className="neo-button mt-4 w-full">Join Session</button>
              </div>
            ))}
          </div>
        </div>

        {/* Community Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="glass-card card-container">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{post.author.name}</h3>
                  <p className="text-sm text-gray-600">{post.author.company}</p>
                </div>
              </div>
              
              <p className="text-gray-800 mb-4">{post.content}</p>
              
              <div className="flex justify-between border-t pt-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600">
                  <ThumbsUp className="w-5 h-5" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600">
                  <MessageSquare className="w-5 h-5" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600">
                  <Share2 className="w-5 h-5" />
                  <span>{post.shares}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
