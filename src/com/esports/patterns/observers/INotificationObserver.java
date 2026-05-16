package com.esports.patterns.observers;

/**
 * Responsabilidad: Definir el contrato para objetos que observan eventos.
 */
public interface INotificationObserver {
    void onEvent(String message);
}

/**
 * Responsabilidad: Administrar la lista de suscriptores y notificar eventos.
 * Patrón: Observer.
 */
import java.util.ArrayList;
import java.util.List;

public class EventManager {
    private List<INotificationObserver> observers = new ArrayList<>();

    public void subscribe(INotificationObserver observer) {
        observers.add(observer);
    }

    public void notify(String message) {
        for (INotificationObserver observer : observers) {
            observer.onEvent(message);
        }
    }
}

/**
 * Implementación concreta de un notificador por Consola.
 */
public class ConsoleNotificationService implements INotificationObserver {
    @Override
    public void onEvent(String message) {
        System.out.println("[Notification] BROADCAST: " + message);
    }
}
