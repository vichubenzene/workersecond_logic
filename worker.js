let lastTime = 0; // Store the last received time

self.onmessage = function(event) {
  const { sentTime } = event.data; // Time sent from main thread

  if (lastTime !== 0) {
    const timeDifference = sentTime - lastTime; // Calculate time difference
    let action = 'No Action';

    // Perform different actions based on the time difference
    if (timeDifference > 5000) {
      action = 'Large Time Gap';
    } else if (timeDifference <= 5000 && timeDifference > 1000) {
      action = 'Moderate Time Gap';
    } else {
      action = 'Small Time Gap';
    }

    // Send data back to the main thread
    postMessage({
      sentTime,
      timeDifference,
      action
    });
  }

  // Remember the current time as the last time for the next comparison
  lastTime = sentTime;
};
