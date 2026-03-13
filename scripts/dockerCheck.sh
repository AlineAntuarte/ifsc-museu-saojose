LOG_FILE="dockerCheck.log"
COMPOSE_FILE="../docker-compose.yml"

if [ ! "$(docker ps -q -f name=ifsc-museu-saojose-app)" ]; then
    echo "[$(date +'%Y-%m-%d %H:%M:%S')]..." >> $LOG_FILE
    echo "Site Museu: Offline - Restarting..." >> $LOG_FILE

    /usr/bin/docker compose -f "$COMPOSE_FILE" up -d >> "$LOG_FILE" 2>&1

echo "----------------------------------------------------" >> $LOG_FILE
fi