// Check if the browser supports Workers
if (window.Worker) {
  // Create a new worker
  const worker = new Worker('worker.js');

  // Function to handle messages from the worker
  worker.onmessage = function(event) {
    const { sentTime, timeDifference, action } = event.data; // Data from worker

    // Display the data at the top of the DOM
    const outputDiv = document.getElementById('output');
    const timeElement = document.createElement('div');
    const sentTimeFormatted = new Date(sentTime).toLocaleTimeString();
    timeElement.textContent = `Time Sent: ${sentTimeFormatted} - Time Difference: ${timeDifference} ms - Action: ${action}`;
    outputDiv.insertBefore(timeElement, outputDiv.firstChild);
  };

  // Log an initial message to indicate the worker is running
  console.log('Worker started. Will log data every 5 seconds...');
  
  // Simulate sending time to worker every 5 seconds
  setInterval(() => {
    const sentTime = Date.now(); // Current time
    worker.postMessage({ type: 'timeData', sentTime });
  }, 5000);
} else {
  console.log('Your browser does not support Web Workers.');
}

// Function to simulate CPU load based on level
function simulateCpuLoad(level) {
  const taskLogDiv = document.getElementById('task-log');
  const taskElement = document.createElement('div');
  
  // Record the start time
  const startTime = Date.now();
  const startTimeFormatted = new Date(startTime).toLocaleTimeString();

  // Display task start time
  taskElement.textContent = `Start Time: ${startTimeFormatted} > Task Level ${level} > `;
  taskLogDiv.insertBefore(taskElement, taskLogDiv.firstChild);

  // Perform a CPU-heavy task (busy loop)
  const duration = 1000 * level; // Increase load duration based on level
  while (Date.now() - startTime < duration) {
    Math.sqrt(Math.random() * 1000000); // Random heavy calculation
  }

  // Record the end time
  const endTime = Date.now();
  const endTimeFormatted = new Date(endTime).toLocaleTimeString();
  const taskDuration = ((endTime - startTime) / 1000).toFixed(2); // Calculate duration in seconds

  // Update the taskElement with end time and duration
  taskElement.textContent += `End Time: ${endTimeFormatted} - Duration: ${taskDuration} seconds`;
}
