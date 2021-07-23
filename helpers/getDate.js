function getDate() {
    let newDate = new Date(Date.now());
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = newDate.getFullYear();
    let month = months[newDate.getMonth()];
    let date = newDate.getDate();
    let hour = newDate.getHours();
  
    //Places 0 in front of all hours less than 10. (i.e. 06:00 vice 6:00).
    if (hour<10){
      hour = `0${newDate.getHours()}`;
    } else {
      hour = newDate.getHours();
    }
    let min = newDate.getMinutes();
  
    //Places 0 in front of all minutes less than 10. (i.e. 06:00 vice 06:0).
    if (min<10){
      min = `0${newDate.getMinutes()}`;
    } else {
      min = newDate.getMinutes();
    }
    let time = `${date} ${month} ${year} ${hour}:${min}`;
    return time;
}

module.exports = getDate;