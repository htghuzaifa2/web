"use client";

import { useState, useEffect } from 'react';

export default function DateDisplay() {
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return <>{date}</>;
}
