import shippingAddress from '../data/shipping-address.json';

// Seguir el mismo patrón que otros servicios: retornar una Promise con delay
export function getShippingAddresses() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(shippingAddress || []);
        }, 600);
    });
};

export async function getDefaultShippingAddress() {
    const addresses = await getShippingAddresses();

    return addresses.find((a) => a.Default || addresses[0] || addresses[0] || null);
};