import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, MessageCircle } from 'lucide-react';

const Home = () => {
  const [hijabs, setHijabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHijabs();
  }, []);

  const fetchHijabs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/hijab');
      if (!response.ok) {
        throw new Error('Failed to fetch hijabs');
      }
      const data = await response.json();
      setHijabs(data);
    } catch (error) {
      setError(error.message);
      // Fallback to mock data if API fails
      const fallbackHijabs = [
        {
          _id: 1,
          name: "Elegant Chiffon Hijab",
          description: "Lightweight chiffon hijab perfect for summer. Features beautiful embroidery and comes in multiple colors.",
          image: "data:image/jpeg;base64,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",
          price: "$25.99",
          averageRating: 4.5,
          reviewCount: 12
        },
        {
          _id: 2,
          name: "Premium Silk Hijab",
          description: "Luxurious silk hijab with elegant draping. Perfect for special occasions and formal events.",
          image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxATEhUSEBAVFRUVFRUXEBUXDw8VFRUVFxUWFhcVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi8lHSUtLS0tLSsrLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIARMAtwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAUGB//EAD8QAAIBAgMFBAcFCAICAwAAAAECAAMRBCExBRJBcYEGUWGhEyIykbHB0UJSYnLwFCOCkqKy4fEzwnODBxU0/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAEDBAIF/8QAIREBAQACAgICAwEAAAAAAAAAAAECEQMhMUESUSIyYRP/2gAMAwEAAhEDEQA/APVYRYQBIRYQBIRYQAiRYQBIsIQBIRYQBIRYQBIRYQBIRYQBIRYkAIQhACJFhAFhFhACEIQAiRYQAhCNdwNYAsifEKON+UrVqpMgMleT6WnH9rTY0cF84n7f+HzlQiMM5+ddf54tBccvEHyk9OsraHpxmNeKDHOSleONyEyU2gye16y/1D6zSoV1cXU3lJlKllhYkiRYTpySEWEAbCLCAJCLCALCEWAJCLCAJCLMrb+ONNAqmzPfPuUanzAiyupt1jj8ro/HbaoU8mqC+nE2PSVhtOk2fpF6m3kZzWAwJquXPsrkvieJm0uBpjVQeczfPLJrnFjitNtCgNa1Mc6iD5ys+28KNa69N4/ARHwqH7I9wmfitlIdFETrUbmFxdKoL03Vu+xBtzHCGJyAnFNhmptvUyQRx4/5nVYXF+loq51BIbwI/V+sNlcdeEoMURggGsecblIRcSpg6jU33QdblPDvTl3f4loGVcchyI1uCPzDh1Fx1gP46HCYkOPHiPpJ5z9OrazDK+Ym5hqwZb+/nL4ZbZ88NJIRYk7TEIQgCQiwgCwhCAEIQgBOT7UMTW3Rruoq82LfUTrJyddg2MYk+qhJP8KAfEGS5vGl+D9trlKmlJFUcBZQNSeUnSi7a2Xw1Pv0+MdhaN/XYZnyHBf1xmilOY7nbemzUnlmnCfiPuX6SCpTI8fLyM2HSUqqTm5ZR1JKxMdhwwJGo/WYkewm9SovcVb33B+AmlWpX58DxEzMCwTEMhyLobdzWsbjuORy/wBSmOcrnLHUaFMxtfTlH0kja4lEEqmNxI9U+GYjaZyEltcEeEYV0N0639/+by7gcTunPQ6/WZmBa4Ze6Tk5dIS67LKb6dNCU9kV9+kDxGR6S5NMu5tls1dCEIRkSEWEAIsIQAhCEAr4/EinTZzwGQ7zoB1Npx+BBuxJuWFmPfvVFDfEzY7UV80p83b4L/290ycIPWHiR5MG+Uy8t3b/ABr4cdSX7dTQEtJK1EjgRLKmZsWjIjiVaoGpk2KrhQTa88+2zWx2KfcX91SvZjext4Tr4/JzvTpMTtbDKd01RfwzmV2gcbi16LAtSYMLHhxBkGH2ZgaOTtvtxLtl45S0cNRYH0dgCLWFrRWY+lJ8vbUwdcVFV10YAjrwPLSJiRMbsfWIVqLa02O7+Un5H+6b2JWWxu4jljq6V6ekkpNI6ehioZ04qhgKn7+qndLWJeynlKOzqZ/asQ3C6AdUU/OLtqtYW8IvR+2z2Vq3VhyM35y/ZFtB3gzqJfiv4s3LNZEhFhKJkhCEAWEIQAhCEA5ftCpOI/8AUn91SUMThyabAGxsbHuy1m/2goexV+6dxvytax6MB/MZQrJkR4TLnNWtmF3jHN43ZaUQGXHtT4kMRu9M8pvdnNuUnG4uKSsw1sy73UXnP4LsozV1xFWp6cKx/dOo9GBa4bd+0wPE6cItPsDS/axiRUdGBBQU1UKgGgJYetlloL8bzi6uPeXak3L1Onc4t/Vv36TB2oW3QEcIzsFViL2JzJtxsoY9BN6snqgd15DRp24DjY2Fxe17HxsPdIY2S9q2dPNO1mwMYMTTFHFvUpsD6Rt+iN02y9VRbW/A5To+y3Z80hd3Zj42A6AaTqlwi90mCAaTvPluXiOcMPi5TEr6DEq+isbNyOR+vSdFXGUy+1dG9EsNVN+nGWtkYn0lBG42seYyPmI+O+hyTqU0ceUamkmZfgZn1qtlAHFrSqKfCIA7n7xv7kUTn9v1/wB4V8Z0GFb1uh+nynJbWe+IcfjIiy8OsfLr+y2q8j8J1M5rs0uY5H4Tppo4v1Zeb9iQiwlEiQhCAEWJFgCRYQgEWJoh1ZG0YEH6znGvbdb2lO63Tj11nUTE27Q3SKo0Nlqf9W+XukuWdbW4cu9IdlDNhyM1AgmLhK27UHccuvCbo0mHLy3Twgq6CQeltnEx2Ia2S5jK2nnMvD4nEneV6afgKl/6gwyt4E3k7XcjoENwCNCMpHWMTCoEpql9ABG1GjpRm7SXeRgfumZnY6r6j0/um45EW/6+c1cZ7J5GYPZZrVWHep8mA+ceF/I8+8a6OqPnMCtV/eKPuqWP66ToMWbDofhOQwVbfL1T7LsSv/ip2At+Yge8zUzN3Z3tcgB5XPxnHo3pMQxHF2PTeM6TE4n0OHeofaIIX87aW9/lMbsrgSfWIipz3Xc9naNrnuFpuSrs2lu0x45y1NWE1GPku8hCEJ04EIQgBCEIAQhJUpcTpAK1Ssq+0wHcLi/QShiqocEN7JBFv1xnMY6vVXENVqqQrEimcrBb6XHG1poHHhhkZmy5Lem/i4JO1CrcEqTmOPeOB/XjOi2bjPSICdRk3MfWcyq1CxuuWq6kkcR8x4jxkuFxPomuc0YWblwYTLk0a9NrFYxbkDrKb7YVc2A/nA+MkrYCkfWtdTmLEkeUpGjRTJKQ3j+DzJtFqKYzHSY9okJCqjsx0CgN5jTrLyVDbMW7x3SphMOfaIzllxYRdJ5a30ixB9U8jOf7KG9VzwCke9hb+0zT2pjFSmzE5AE+Uodj8OVo+kYWaqd7+H7PxJ/ij48d0srrFd7WVm9D6NDZqrLTB7g2bnw9UNnM3BUgd1VHq2B5IuSDqbtJdvVN+qiX0U38AfbPRQB/HCpiPQUXrEesfYX8R9VF6ZX5GaWdnbfqGvXXDJ7NPOp+cjToPiZ0WDoimoUTL7PYAou82dRyWYnW5zLH3zb2fSL1AOHyhOxbqOlwq2RR4CSwhNcYqIQhAhCEIAQAj0pkydKdoAlCjxMi2nV3VsNW+Es71tTYSg9Mu5Y6cJzTiLD4JGQrUUMragzjdt7KbCNvrdqRPqN938LfWegEcJHXoq6lKihlYWYHQicZ4TKLcXLcL/HG7KxiNnfP5RdoYUZldDqO4/QzE7RbCr4N70Az0m9g6lfwt9eMt7DwONrqH31RbnMtdvH1R87TP8Lfx02XPHXy2t7Cx26xo1Dkf+MngfuzccrM/aHZ07oIYMw9rLdv4gXNpl79YncLFeevnJ5ceUGPJjl3G5VxQE5bbva/D0jub+/UPs00sx6nRes1P2BSCrMTfU7xv/iZGK7L4Yn1qYOuZJvnrDHj+xc/pQVauJZfTEbhIO4p9W2uZ+0fLwnWlgBynN4Ds2KDFsPVdb6qzGonQMbjoZoY+jiDRdQ1MEiwa5QC+ROd87X4ysknhO23yq4AGs7VOFRiF/8AEhzPU2HIiS41PTYhaf2KI337t9hlfkv90tYFNwezZVUKtrEboGuX6ykWz1Po7/bruWN+AOdj4BbCMmjhMyTawAsPkOgz5nwm7sTDWUt35DlMugmijQfrPxnSUVsoFrZad0pxztHluofCEJdnEIQgBCEWAWGcLlmT3Q9Y+EhUktvHoJcDAiI1d6d9Yim0leQPAJWjSI5TleRVKlshmf1rAI8XubhWoLg5W75mbF2d6HfAJ3WN1B4frKaATO5zPw5R8Nd7PfWhKuIwFN9RLUIWS+Sls8OUx9EUmtZt25u19PEi2krnEKPay7iSCp8QwFre6b2P3S5U8fpMp9nlTembX1Ui6HmOB8RMmU1W3G7iotOux9WpTC8PUJPv3reUvUqLgZqG7ze585AMNTB9ZPRsftKbAnmMjyIkv7PVGdOqG8GFv6h9IGkLDitulo1qKk34558c/HoJBU2jWT/lw7Ed6De8hDDbWwrmy1AG+6fVb+Uw2NJ6dYUrFlJUEFmuPMTpabhgGBuCLic8zC2YuONs/eJo7NxyboUEboyUjTrK8eWkOXHfbTiQiy7OSEIQAixIsAcxhSqkRxC8TI2rIOPxnJrgzkFQRtDEA6HLvjaj30jBDVIFhr8IxFtz4mKBBmAFzpAiwlL/AOzp3sSR42kNbbCA2Ck+Uez005Di8QKalirN4KASeUoPtN+CAX0zufdG4dmIJdrknoOU4yy1HeGG72x8Zjt6oGByvnz7jL9LEAxmM2YGO8uTce5vzD5yonqndYFT5HkZmampkRYgEcQZQxGznHrYd7fgYkqeR1XzEnSrJ1eBseltdlO5VUo3cfiDoRylqpUo1RapTRx+JFb4y7XpJUG7UUMPEaeI7pSGyAudNsu4/WLsdG08DRH/AB71P8rsR/K1x7o5qbKbld78aCzfxLx85ZpU7aiWABwjgpMDjiBqGXw/WU16VQMLgzGeiCbjI94yvz74xcSabDeyvkrfZPge4+Erjnryhnx78N6Eiw9cMPHiJNLs9miRYQgFXF4hrZC3cJngs7AMcydO6Oqmq5yUgeMuYLB7uZzb4Tjy68LKKALDhHRLyKpikXVh77n3CduU0ztq1rCw/wBmJSxrVKgVQQvHv6yTE0bsOcVpyMr9nIzbhoPHifl0ljC4L7bDXQS8lAM2egl2nT4xOtsnFJuD8TaeAhSACgDh/uTbSFyfCVKByIPSQyvbRhPxT3jHRSLMAR4yBqhBjvSTnbvSCpgWGdM3H3SfgfrIfS52IIPcZoJVi1EVhZhf9cDEaCk95OplVsGy+wbjuOvv4x1LEWybI+IgF4RCoiLUBjo3KMiNZQwKsLg6gi4Me0jBzjJDTLUTcElPE3KjxPFfhN2lUDC4mXItl1/R1DRJyOdPkeHQ5crTvDLXSfJjub9tyEIS7O5M7ZcZBgo5C/UmNTGFtSzcy0j2fscnNpt0dnqOE4docK4+75S9UwKOpK5ECC0ANJZwwzt35Rkh2Ph7KWI8B85NqSe7TrLVQbqW7hIMMmWfHM8uEAdTSw5yPF1t0bo14+Enqvui/u5zKZrm56zjPLXTvDHfZ1spn4tSp3hwl0mNuGFjJVoimxFRd9Oo7j3SOk/COwmEZKpt7J17ouKom+8uvGcujqrWtaTUmvKqm8tUVgEgitY6i/MRwWNgRFpLwEk0iKIPrGRjZxhEltG2jAmZt5txBWGtJgW/ISFboLhv4ZpvK+0cOKlGpTP20df5lIgGxgq4dAw4jPnCc7/8f4/0mHUHXdF+YyPyhNGGW8dsvJj8crHQUqdh0ixtN44wIknwiXYeGcgEvYFdT0gCY3MW7zFVbCOcXMhxlSwsNT8IW67Em+lPGVbnLQafWY218YyAJSF6jZKPGX6tSwJ7tJVwVDM1W9o+z4CZ7d1qxmosXykVTISSNqC8Rw2hXuM5KbHSRIlpRXEEVfAixiNf9HHrJFgVj0NjegIsUCBFEYI8xLQBDGSQiRkxgPpG0468aBnAnN9l29DXr0xotRiv5WJt5WhIKb2x1bx+SrCLHOzp1nhL3XZ0WuJYAlOlcS9SN5pYzQJo4ZbKPHP3yotK+U0DpHCqLxmTiau8Seg5S/j6m6tuJy6cZmN8JLO+luOe1eom8QvAayYi8EWw5xTkJNVHVjBHNIxkYjPMzqtH1rzRjWpwploNwkl5XAtJgYgeGjxIo9YyPJiWiCBjIM0gMmaQwMCDNFAjXgHJbRG7jGPfY+9BCS9phasrd6/UQkvas7kd96IQWh3GS274qTa85Lh1N8x1kzwpjKR16lhfuEYZuOe724DL6yAwGpMUzPbvtqk10bxjKhzkiyCIxEdco4CU9r1ytM7vtNZE/MxCg9Cb9IjS4SsHAZdDcaHgSD5gy1uzCTFiliUw6j1PRAflINh7wLdBOgXPSMqiKQ3JMRACGhtDaOklo0iAIIRRCAMqGRgR7RoEDOAjKkkAjKkA53tTTv6M+BH698Ja7RJdEPcT5/6hJ5TtTG9OvBjg0bHUluRNzzlwaSjtF8rd8vEzK2g3rAd04zvTvjm8ldRlBjFjWkWgh0kQkjxqiIxMjFNv4mmnCmrVW5+wnxY9Jr1DMDZj7z4isdC/o1/LTFj/AFFjE6iHF0v3rVO+wHIfozd2bibjP9GVa2E3qaN4bx65/SU6blDfrK2IzLddHHKJBh6wYXk6mcR2CI0iSGNYQKUyI0dGGJ0YYARTAQM6RVZKZFVgGdttb0eTD5xZJtRb0T0+IhOMnWNdHJcNqeUWE2sCczIxftnnCEnyeFeLyY0Y0ISVWhjRUhCI0OJORnN7L/8Awqe9WJ8STmYQi9uvTrqij0A/KPlOfqjI84Ql8mbBZ2SxuRy+f0E1lhCS9rejljmhCMkbRphCcujYQhAyyKtCEQQYz/jPT4iEIQpR/9k=",
          price: "$45.99",
          averageRating: 4.8,
          reviewCount: 8
        },
        {
          _id: 3,
          name: "Cotton Jersey Hijab",
          description: "Comfortable cotton jersey hijab for everyday wear. Breathable fabric with perfect stretch.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFwUaWh_uYFpi2APLgyaTxax3ibds5L8NJAA&s",
          price: "$19.99",
          averageRating: 4.3,
          reviewCount: 15
        },
        {
          _id: 4,
          name: "Lace Trimmed Hijab",
          description: "Beautiful lace trimmed hijab that adds elegance to any outfit. Available in soft pastel colors.",
          image: "https://m.media-amazon.com/images/I/61NoEfr56rL._AC_SL1200_.jpg",
          price: "$29.99",
          averageRating: 4.6,
          reviewCount: 10
        }
      ];
      setHijabs(fallbackHijabs);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
        />
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Hijabs</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Hijab Styles Gallery
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover beautiful hijab styles, read reviews, and share your experiences with our community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {hijabs.map((hijab) => (
          <div
            key={hijab._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={hijab.image}
              alt={hijab.name}
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFwUaWh_uYFpi2APLgyaTxax3ibds5L8NJAA&s';
              }}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {hijab.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {hijab.description}
              </p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-primary-600">
                  {hijab.price}
                </span>
                <div className="flex items-center space-x-1">
                  {renderStars(hijab.averageRating || hijab.rating)}
                  <span className="text-sm text-gray-600 ml-1">
                    ({hijab.averageRating || hijab.rating})
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <MessageCircle size={16} />
                  <span>{hijab.reviewCount} reviews</span>
                </div>
                <Link
                  to={`/hijab/${hijab._id || hijab.id}`}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
