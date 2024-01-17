import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-8 min-h-[800px]">
      <h1 className="text-3xl font-bold mb-4">Welcome to QckJUSTFind</h1>

      <div>
        <h2 className="text-2xl font-bold mb-2">About Us</h2>
        <p>
          At QckJUSTFind, we believe in simplifying the way you discover and
          connect with local businesses. Our mission is to make it quick and
          easy for you to find the services you need, right when you need them.
          Whether you're searching for a cozy cafe, a reliable plumber, or the
          trendiest boutique in town, QckJUSTFind is your go-to destination.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">What Sets Us Apart</h2>
        <ul className="list-disc pl-6">
          <li>
            <strong>Comprehensive Directory:</strong> QckJUSTFind is your
            one-stop directory for local businesses, bringing together a
            diverse range of services under one virtual roof.
          </li>
          <li>
            <strong>User-Friendly Interface:</strong> Our website is designed
            with simplicity in mind, ensuring that you can navigate
            effortlessly and find what you're looking for without any hassle.
          </li>
          <li>
            <strong>Community-Centric Approach:</strong> QckJUSTFind is more
            than just a directory; it's a community hub. We foster connections
            between businesses and customers, creating a vibrant network where
            local enterprises thrive.
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">How It Works</h2>
        <ol className="list-decimal pl-6">
          <li>
            <strong>Search:</strong> Enter your location and the service
            you're looking for in our search bar.
          </li>
          <li>
            <strong>Explore:</strong> Browse through a curated list of
            businesses tailored to your search criteria.
          </li>
          <li>
            <strong>Connect:</strong> Find detailed information, reviews, and
            contact details to connect with the businesses you're interested
            in.
          </li>
        </ol>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">
          Join Us in Simplifying Local Discovery
        </h2>
        <p>
          Whether you're a business owner looking to increase your visibility
          or a customer searching for the best local services, QckJUSTFind is
          here for you. Join us on this journey of simplifying local discovery
          and supporting the heartbeat of your community.
        </p>
      </div>

      <p className="mt-8">Thank you for choosing QckJUSTFind!</p>
    </div>
  );
};

export default About;

