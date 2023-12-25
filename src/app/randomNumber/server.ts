"use server"

// make a function called makeRandomNumber that recives two numbers and returns a random number between them

export async function makeRandomNumber(min:number, max:number) {
  let error = "";

  if (min == undefined || max == undefined) {
    error = "Error: min and max must be defined";
  } else if (min > max) {
    error = "Error: min must be less than max";
  } else if (min == max) {
    error = "Error: min must not equal max";
  } 

  if (error == "") {
    return await (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  } else {
    console.log(error);
    return error;
  }
}