export function getAuthErrorMessage(error: { code?: string; message?: string } | null | undefined) {
  switch (error?.code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Please sign in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Use at least 6 characters for a stronger password.";
    case "auth/user-not-found":
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "The email or password you entered is incorrect.";
    case "auth/too-many-requests":
      return "Too many attempts were made. Please wait a moment and try again.";
    default:
      return error?.message || "Something went wrong while processing your request.";
  }
}
