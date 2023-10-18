"use server"

// make a function called makeRandomNumber that recives two numbers and returns a random number between them

export async function makeRandomNumber(min:number, max:number) {
  let error = "";

  if (min > max) {
    error = "Error: min is greater than max"
  } else if (min == max) {
    error = "Error: min is equal to max"
  } else if (min == undefined || min == null) {
    error = "Error: minimum number is undefined"
  } else if (max == null || max == undefined) {
    error = "Error: maximum number is null"
  } 

  if (error == "") {
    return await (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  } else {
    console.log(error);
    return error;
  }
}