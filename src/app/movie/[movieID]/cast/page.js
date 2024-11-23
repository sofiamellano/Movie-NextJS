"use client";
import CastDetails from "./[castID]/page";
import React, { useState, useEffect } from 'react';

export default function Cast() {
    const [selectedCastId, setSelectedCastId] = useState(null);

    const handleActorClick = (castID) => {
        setSelectedCastId(castID);}

    return <CastDetails castID={selectedCastId}/>;
}
