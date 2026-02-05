'use server';

import { db } from '@/db';
import { bragSheetTable, type InsertBragItem, type SelectBragItem } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function getBragItems() {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    try {
        const items = await db
            .select()
            .from(bragSheetTable)
            .where(eq(bragSheetTable.userId, userId))
            .orderBy(desc(bragSheetTable.date));
        return items;
    } catch (error) {
        console.error('Error fetching brag items:', error);
        throw new Error('Failed to fetch brag items');
    }
}

export async function addBragItem(data: Omit<InsertBragItem, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    try {
        const newItem: InsertBragItem = {
            ...data,
            userId,
        };
        const [result] = await db.insert(bragSheetTable).values(newItem).returning();
        revalidatePath('/brag');
        return result;
    } catch (error) {
        console.error('Error adding brag item:', error);
        throw new Error('Failed to add brag item');
    }
}

export async function updateBragItem(id: number, data: Partial<Omit<InsertBragItem, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>) {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    try {
        const [updatedItem] = await db
            .update(bragSheetTable)
            .set(data)
            .where(eq(bragSheetTable.id, id))
            .returning();
        revalidatePath('/brag');
        return updatedItem;
    } catch (error) {
        console.error('Error updating brag item:', error);
        throw new Error('Failed to update brag item');
    }
}

export async function deleteBragItem(id: number) {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    try {
        await db.delete(bragSheetTable).where(eq(bragSheetTable.id, id));
        revalidatePath('/brag');
        return { success: true };
    } catch (error) {
        console.error('Error deleting brag item:', error);
        throw new Error('Failed to delete brag item');
    }
}
