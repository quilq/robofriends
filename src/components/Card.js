import React from 'react';

const Card = ({name, email, id} ) => {// destructuring
    return (
        <div className="bg-light-green dib br3 ma2 grow">
            <img src={`https://robohash.org/${id}?200x200`} alt="robots"/>
            <div>
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
        </div>
    );
}

export default Card;