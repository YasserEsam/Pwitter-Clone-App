import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { currentId, userId } = req.body;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid user ID");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: currentId,
      },
    });

    if (!currentUser) {
      throw new Error("Current user not found");
    }

    let updatedFollowingIds = [...(currentUser.followingIds || [])];

    if (req.method === "POST") {
      if (!updatedFollowingIds.includes(userId)) {
        updatedFollowingIds.push(userId);

        try {
          await prisma.notification.create({
            data: {
              body: "Someone followed you!",
              userId,
            },
          });
          await prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              hasNotification: true,
            },
          });
        } catch (error) {
          console.log("Notification Error:", error);
        }
      }
    }

    if (req.method === "DELETE") {
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentId },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error:", error);
    return res.status(400).end();
  }
}
