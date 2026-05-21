const generateTrackingId = () => {
  const random = Math.floor(
    1000000 + Math.random() * 90000000
  );

  return `TRK-${random}`;
};

module.exports = generateTrackingId;