import React from "react";

const CompanyDetail = () => {
  return (
    <div className="flex flex-col gap-8 mx-12 md:mx-20 lg:mx-32">
      <h1 className="text-base font-bold md:text-xl lg:ml-8">About Us</h1>
      <div className="flex flex-col items-center">
        <p className="text-sm sm:text-base lg:text-lg w-11/12 text-justify text-zinc-600">
          Welcome to Bhojan Point, where culinary delight meets convenience!
          We’re passionate about bringing you the best of Nepalese and
          international cuisine right to your doorstep. Our user-friendly
          platform makes ordering your favorite dishes a breeze, whether you’re
          craving local flavors or international favorites.
        </p>
        <p className="text-sm sm:text-base lg:text-lg w-11/12 text-justify text-zinc-600">
          <br />
          At Bhojan Point, we believe in quality and freshness. Our partnered
          restaurants are carefully selected to ensure you enjoy delicious
          meals, prepared with love. Join us in celebrating the vibrant food
          culture of Nepal—order now and experience the joy of Bhojan Point!
        </p>
        <p className="text-sm sm:text-base lg:text-lg w-11/12 text-justify text-zinc-600">
          <br />At Bhojan Point, we’re not just about food; we’re about building a
          community. We strive to connect local chefs and restaurants with food
          lovers across Nepal, promoting local flavors and sustainable
          practices. With Bhojan Point, you’re not just ordering food—you’re
          supporting local businesses and enjoying the best that Nepal has to
          offer.
        </p>
      </div>
    </div>
  );
};

export default CompanyDetail;
