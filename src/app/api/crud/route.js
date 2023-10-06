import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(req, res) {
  try {
    const retrieve = await prisma.todo.findMany({});
    return NextResponse.json({
      msg: "success",
      data: retrieve,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "failed",
      data: error,
    });
  }
}

export async function POST(req, res) {
  try {
    const body = await req.json();
    const params = new URL(req.url).searchParams;
    const id = params.get("id");
    const insert = await prisma.todo.create({
      data: {
        ...body,
        user: {
          connect: {
            id: id,
          },
        },
      },
    });
    return NextResponse.json({
      msg: "success",
      data: insert,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "failed",
      data: error,
    });
  }
}

export async function PATCH(req, res) {
  try {
    const params = new URL(req.url).searchParams;
    const id = params.get("id");
    const updateOne = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        ...req.body,
      },
    });
    return NextResponse.json({
      msg: "success",
      data: updateOne,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "failed",
      data: error,
    });
  }
}

export async function DELETE(req, res) {
  try {
    const params = new URL(req.url).searchParams;
    const id = params.get("id");
    const deleteOne = await prisma.todo.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({
      msg: "success",
      data: deleteOne,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "failed",
      data: error,
    });
  }
}
