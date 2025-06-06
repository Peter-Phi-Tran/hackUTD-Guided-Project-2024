import React from "react";
 
function Card(props) {
  return (
    <div className="p-4">
      {/* Card Container with a Gradient Border */}
      <div className="relative h-full w-full max-w-xs rounded-2xl border-2 border-transparent bg-gradient-to-br from-pastelblue to-pastelgreen p-1 shadow-lg transition duration-300 hover:shadow-2xl">
        {/* Inner Box */}
        <div className="h-full w-full rounded-2xl bg-white p-4 transition duration-300 hover:scale-105">
          <img
            className="mx-auto my-4 h-40 w-full rounded-xl object-cover shadow-md"
            src={props.img}
            alt={props.name}
          />
          <div className="space-y-3">
            <h1 className="poppins-semibold text-xl text-darkblue">
              {props.name}
            </h1>
            <p className="inter-regular flex py-1 text-sm text-gray-500">
                Bringing: {props.bringing}
            </p>
            <p className="inter-semibold text-sm text-emerald-500">
                {props.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Card;