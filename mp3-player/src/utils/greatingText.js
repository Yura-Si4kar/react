export function greetingText(time) {
  if (time >= 0 && time < 12) {
    return "Good morning!";
  } else if (time >= 12 && time < 18) {
    return "Good day!";
  } else if (time >= 18 && time <= 23) {
    return "Good evening!";
  } else {
    return "Hello!";
  }
}
