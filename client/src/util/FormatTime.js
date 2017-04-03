export default function formatTime(seconds) {
  const SECONDS_IN_HOUR = 3600; 
  const hoursPortion = Math.floor(seconds / SECONDS_IN_HOUR);
  const secondsLeftOver = seconds - (SECONDS_IN_HOUR * hoursPortion);
  const minutesPortion = Math.floor(secondsLeftOver / 60);
  const secondsPortion = seconds % 60;

  const returnString =
    (hoursPortion > 0 ? hoursPortion + ":" : "") +
    withLeadingZero(minutesPortion) + ":" +
    withLeadingZero(secondsPortion);

  return returnString;
}

function withLeadingZero(num) {
  return(
    (num >= 10 ? num : "0" + num).toString()
  )
}