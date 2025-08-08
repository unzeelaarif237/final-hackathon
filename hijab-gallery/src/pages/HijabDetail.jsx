import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MessageCircle, User, Send } from 'lucide-react';

const HijabDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hijab, setHijab] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, text: '' });
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    // Mock data for hijab details
    const mockHijab = {
      id: parseInt(id),
      name: "Elegant Chiffon Hijab",
      description: "Lightweight chiffon hijab perfect for summer. Features beautiful embroidery and comes in multiple colors. Made from high-quality chiffon fabric that drapes beautifully and stays in place all day. Available in various colors including black, white, navy, and blush pink.",
      image: "data:image/jpeg;base64,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",
      price: "$25.99",
      material: "100% Chiffon",
      care: "Hand wash cold, hang dry",
      sizes: "One size fits all"
    };

    // Mock reviews
    const mockReviews = [
      {
        id: 1,
        userName: "Aisha Ahmed",
        rating: 5,
        text: "Absolutely love this hijab! The quality is amazing and it looks even better in person. The embroidery is so delicate and beautiful.",
        date: "2024-01-15"
      },
      {
        id: 2,
        userName: "Fatima Khan",
        rating: 4,
        text: "Very nice hijab, the fabric is lightweight and perfect for summer. Only wish it came in more colors.",
        date: "2024-01-10"
      },
      {
        id: 3,
        userName: "Sarah Johnson",
        rating: 5,
        text: "This is my go-to hijab for special occasions. Always gets compliments!",
        date: "2024-01-05"
      }
    ];

    setTimeout(() => {
      setHijab(mockHijab);
      setReviews(mockReviews);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    const review = {
      id: Date.now(),
      userName: user.name,
      rating: newReview.rating,
      text: newReview.text,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, text: '' });
  };

  const renderStars = (rating, interactive = false, onChange = null) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={20}
        className={`cursor-pointer ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        onClick={() => interactive && onChange && onChange(i + 1)}
      />
    ));
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!hijab) {
    return <div className="text-center py-8">Hijab not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <img
            src={hijab.image}
            alt={hijab.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{hijab.name}</h1>
          <p className="text-2xl font-bold text-primary-600 mb-4">{hijab.price}</p>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {renderStars(parseFloat(calculateAverageRating()))}
            </div>
            <span className="ml-2 text-gray-600">
              {calculateAverageRating()} ({reviews.length} reviews)
            </span>
          </div>

          <p className="text-gray-700 mb-6">{hijab.description}</p>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="font-semibold">Material:</span>
              <span>{hijab.material}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Care Instructions:</span>
              <span>{hijab.care}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Sizes:</span>
              <span>{hijab.sizes}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        
        {user && (
          <form onSubmit={handleReviewSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex space-x-1">
                {renderStars(newReview.rating, true, (rating) => 
                  setNewReview({ ...newReview, rating })
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                rows="4"
                placeholder="Share your experience with this hijab..."
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 flex items-center space-x-2"
            >
              <Send size={16} />
              <span>Submit Review</span>
            </button>
          </form>
        )}

        {!user && (
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              Please{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-blue-600 underline"
              >
                login
              </button>{' '}
              to write a review.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <User size={20} className="text-primary-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {review.userName}
                    </h4>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    {renderStars(review.rating)}
                  </div>
                  <p className="mt-2 text-sm text-gray-700">{review.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HijabDetail;
