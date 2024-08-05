export default function APICaller(
    endpointURL: string,
    methodType: string,
    body?: any
) {
    const token = localStorage.getItem("token");
    if (token) {
        const request: RequestInit = {
            method: methodType,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }

        if (methodType !== "GET") {
            request.body = JSON.stringify(body);
        }

        return getData(fetch(endpointURL, request));
    }
    return getData(fetch(endpointURL, {
        method: methodType,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }))
}

function getData(promise: Promise<Response>) {
    return promise.then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}