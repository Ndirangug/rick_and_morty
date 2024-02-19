import { Character, CharcterQueryDocument, CharcterQueryQueryVariables } from '@/app/_graphql/types/graphql';
import { rickAndMortyEndpoint } from '@/config';
import { initializeApp } from 'firebase-admin/app';
import { request as gqlRequest } from 'graphql-request';
import { NextRequest } from 'next/server';

const app = initializeApp();

interface CharacterWithNotes extends Character {
    notes?: String
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id

        if (!id) {
            Response.json({ error: "Expected param id to be a number" }, { status: 400 })
        }

        const variables: CharcterQueryQueryVariables = {
            id
        }

        const character = (await gqlRequest(rickAndMortyEndpoint, CharcterQueryDocument, variables)).character as Character

        return Response.json({ data: character })
    } catch (error) {
        return Response.json({ error: error }, { status: 500 })
    }

}