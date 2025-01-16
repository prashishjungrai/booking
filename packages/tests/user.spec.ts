import { describe, expect, test, it } from 'vitest'
import axios from "axios"

const BACKEND_URL = "http://localhost:8080"

const PHONE_NUMBER_1 = "9843523401";
const NAME_1 = "prashish";

describe("Signup endpoints", () => {

  it('Double signup doesnt work', async () => {
    const response1 = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
      number: PHONE_NUMBER_1,
    });

    const response2 = await axios.post(`${BACKEND_URL}/api/v1/user/signup/verify`, {
      name: NAME_1,
      otp: "000000"
    });

    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(response1.data.id).not.toBeNull();

    expect(async () => {
      await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        number: PHONE_NUMBER_1,
      });
    }).toThrow();

  })

})