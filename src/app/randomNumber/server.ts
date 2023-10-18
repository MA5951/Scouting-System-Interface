"use server"

// make a function called makeRandomNumber that recives two numbers and returns a random number between them

export async function makeRandomNumber(min:number, max:number) {
  return await Math.floor(Math.random() * (max - min + 1)) + min;
}