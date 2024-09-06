export function genRandomNumber() {
   return Math.round(Math.random()*10**12)
}

export function timeTo12Hr(time: string) {
   const timeArr = time.split(':')
   let hrNum = Number(timeArr[0])
   let ampm = "AM"
   if (hrNum > 12) {
      hrNum = hrNum-12
      ampm = "PM"
   } else if (hrNum === 0) {
      hrNum = 12
   } else {
      throw Error("Something went wrong converting to 12 Hour time")
   }

   return String(hrNum) + ':' + timeArr[1] + ' ' + ampm
}