<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Palosebo Game Test</title>
</head>
<body>
    <h1>Palosebo Game Backend Test</h1>

    <button onclick="getPlayers()">Show Players</button>
    <button onclick="updateProgress(1)">Update Player 1</button>
    <button onclick="updateProgress(2)">Update Player 2</button>
    <button onclick="checkWinner()">Check Winner</button>

    <pre id="output"></pre>

    <script>
        async function getPlayers() {
            let res = await fetch('/players');
            let data = await res.json();
            document.getElementById('output').textContent = JSON.stringify(data, null, 2);
        }

        async function updateProgress(id) {
            let res = await fetch(`/progress/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': '{{ csrf_token() }}'
                },
                body: JSON.stringify({ points: 10 })
            });
            let data = await res.json();
            document.getElementById('output').textContent = JSON.stringify(data, null, 2);
        }

        async function checkWinner() {
            let res = await fetch('/winner');
            let data = await res.json();
            document.getElementById('output').textContent = JSON.stringify(data, null, 2);
        }
    </script>
</body>
</html>
