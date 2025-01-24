"use server"

export async function generateJitsiLink(formData: FormData) {
  const startDate = formData.get("startDate") as string
  const endDate = formData.get("endDate") as string
  const startTime = formData.get("startTime") as string
  const endTime = formData.get("endTime") as string

  // Validate input (you may want to add more thorough validation)
  if (!startDate || !endDate || !startTime || !endTime) {
    return { success: false, error: "Missing required fields" }
  }

  // Generate a random room name
 const roomName = Math.random().toString(36).substring(2, 8);

  // Construct the Jitsi link
  const jitsiLink = `https://meet.jit.si/${roomName}/prepspective`

  return { success: true, link: jitsiLink }
}

