import { SvelteKitAuth } from '@auth/sveltekit'
import AzureADProvider from '@auth/core/providers/azure-ad'
import type { Provider } from '@auth/core/providers';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

async function authorization({ event, resolve }) {
    // Protect any routes under /authenticated
    if (event.url.pathname.startsWith('/')) {
   const session = await event.locals.getSession();
        if (!session) {
            throw redirect(303, '/auth/signin');
        }
        console.log(session)
    }

    // If the request is still here, just proceed as normally
    return resolve(event);
}


export const handle: Handle = sequence( 
    SvelteKitAuth({
    providers: [
      AzureADProvider({ 
        clientId: '', // ClientID, 
        clientSecret: '', // Client Secret
        tenantId: '', // TenantID
        }),
    ] as Provider[],
    secret: '', // Auth Secret
    trustHost: true
    }),
    authorization
)