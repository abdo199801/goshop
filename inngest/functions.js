import { Inngest } from "./client";

// Function to create user in database when user is created in Clerk
export const syncUserCreation = Inngest.createFunction(
  { id: 'sync-user-create' },
  { event: 'user.created' },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.create({
      data: {
        id: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      }
    });
  }
);

// Function to update user in database when user is updated in Clerk
export const syncUserUpdation = Inngest.createFunction(
  { id: 'sync-user-update' },
  { event: 'clerk/user.updated' },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.update({
      where: { id: data.id },
      data: {
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      }
    });
  }
);

// Function to delete user from database when user is deleted from clerk
export const syncUserDeletion = Inngest.createFunction(
  { id: 'sync-user-deleted' },
  { event: 'clerk/user.deleted' },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.delete({
      where: { id: data.id }
    });
  }
);