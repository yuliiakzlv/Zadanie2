# Zadanie 2 

## Opis działania

Pipeline GitHub Actions:

1. Buduje obraz Dockera na podstawie aplikacji z Zadania 1 i `Dockerfile`
2. Wspiera architektury: `linux/amd64` i `linux/arm64`
3. Korzysta z **cache** przechowywanego w publicznym repozytorium na DockerHub
4. Wykonuje **skanowanie CVE** przy pomocy narzędzia **Trivy**
5. Wysyła obraz do **GitHub Container Registry (ghcr.io)** tylko, jeśli brak zagrożeń `CRITICAL` lub `HIGH`

===========================

## Tagowanie obrazów i cache

- Obraz wysyłany jest do:  
  `ghcr.io/yuliiakzlv/zadanie2:latest`

- Cache przechowywany jest w:  
  `docker.io/julcia/weather-cache:latest`

**Uzasadnienie**:  
Cache na DockerHub pozwala na szybki dostęp i współdzielenie między architekturami oraz reużycie warstw. `latest` jako tag pozwala zawsze pracować na bieżącej wersji.

==============================

## Wymagania i autoryzacja - nie działa (ale nadawala wszystkie uprawnienia)!!

- Do logowania do `ghcr.io` wykorzystywany jest Personal Access Token (`GHCR_PAT`) z uprawnieniami read oraz write.

Token ten przechowywany jest w `Secrets` repozytorium GitHub.


## Skanowanie CVE

Skaner `Trivy` uruchamiany jest automatycznie po zbudowaniu obrazu.  
Jeśli wykryte zostaną luki z poziomem zagrożenia `CRITICAL` lub `HIGH`, obraz **nie zostanie wysłany** do `ghcr.io`.



